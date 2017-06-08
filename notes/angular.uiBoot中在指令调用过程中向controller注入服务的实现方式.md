# 在运行中向控制器中注入服务参数. $controller服务.

在ui.bootstrap的模态框组件中, 当创建模态框后, 在模态框使用的控制器中可以注入 $uibModalIntance 参数, 通过该参数可以控制模态框的状态, 及获取父控制器传递的数据. 但是 $uibModalInstance 服务并非全局注册的服务, 在非模态框的控制器中无法获取该服务. 

### 使用案例

```javascript

angular.module('app', [])
.controller('modalCtrl', function ($scope, $uibModalInstance) {
	// 在模态框调用的controller中可以注入$uibModalInstance服务, 否则无法注入.
    console.log('$uibModalInstance:', $uibModalInstance);
})
.directive('myDir', function () {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope, $uibModal) {
            $scope.openModal = function () {
                $uibModal.open({
                    animation: false,
                    template: '<div>我是弹窗中的内容</div>',
                    controller: 'modalCtrl',
                    controllerAs: 'modal',
                    resolve: {
                        modalData: {
                            name: '我是模态框'
                        }
                    }
                });
            };
            $scope.logModalIns = function () {
                // console.log('$uibModalInstance:', $uibModalInstance);
            };
        },
        controllerAs: 'myDir',
        template: '<div>我是自定义组件 <button type="button" ng-click="openModal()">按钮</button></div>'
    };
})

```

### 模态框这部分实现源码

[模态框实现源码](https://github.com/angular-ui/bootstrap/blob/master/src/modal/modal.js)

模态框是注册了一个服务, $uibModal, 通过调用 $uibModal.open() 可以生成一个模态框.

以下是 open 函数的源码. 已删除与主题无关的部分

```javascript

$modal.open = function(modalOptions) {
	// 创建一些promise
    var modalResultDeferred = $q.defer();
    var modalOpenedDeferred = $q.defer();
    var modalClosedDeferred = $q.defer();
    var modalRenderDeferred = $q.defer();

    //prepare an instance of a modal to be injected into controllers and returned to a caller
    // 创建 modalInstance 对象, 该对象会作为 $uibModalInstance 注入控制器中.
    var modalInstance = {
        result: modalResultDeferred.promise,
        opened: modalOpenedDeferred.promise,
        closed: modalClosedDeferred.promise,
        rendered: modalRenderDeferred.promise,
        close: function (result) {
            return $modalStack.close(modalInstance, result);
        },
        dismiss: function (reason) {
            return $modalStack.dismiss(modalInstance, reason);
        }
    };
    // modalOptions 创建模态框时传入的参数
    //merge and clean up options
    modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
    modalOptions.resolve = modalOptions.resolve || {};
    modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0); // 模态框要追加到页面的父元素

    if (!modalOptions.appendTo.length) {
        throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
    }

    //verify options
    if (!modalOptions.component && !modalOptions.template && !modalOptions.templateUrl) {
        throw new Error('One of component or template or templateUrl options is required.');
    }

    var templateAndResolvePromise;
    if (modalOptions.component) {
        templateAndResolvePromise = $q.when($uibResolve.resolve(modalOptions.resolve, {}, null, null));
    } else {
        templateAndResolvePromise =
            $q.all([getTemplatePromise(modalOptions), $uibResolve.resolve(modalOptions.resolve, {}, null, null)]);
    }

    function resolveWithTemplate() {
        return templateAndResolvePromise;
    }

    // Wait for the resolution of the existing promise chain.
    // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
    // Then add to $modalStack and resolve opened.
    // Finally clean up the chain variable if no subsequent modal has overwritten it.
    var samePromise;
    samePromise = promiseChain = $q.all([promiseChain])
        .then(resolveWithTemplate, resolveWithTemplate)
        .then(function resolveSuccess(tplAndVars) {
            var providedScope = modalOptions.scope || $rootScope;

            var modalScope = providedScope.$new(); // $new用来创建子scope, 这个scope即打开的模态框的scope
            modalScope.$close = modalInstance.close; // 给scope增加$close, $dismiss 方法, = 模态框实例的close, dismiss方法.
            modalScope.$dismiss = modalInstance.dismiss;

            modalScope.$on('$destroy', function() {
                if (!modalScope.$$uibDestructionScheduled) {
                    modalScope.$dismiss('$uibUnscheduledDestruction');
                }
            });

            var modal = {
                scope: modalScope,
                deferred: modalResultDeferred,
                renderDeferred: modalRenderDeferred,
                closedDeferred: modalClosedDeferred,
                animation: modalOptions.animation,
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                backdropClass: modalOptions.backdropClass,
                windowTopClass: modalOptions.windowTopClass,
                windowClass: modalOptions.windowClass,
                windowTemplateUrl: modalOptions.windowTemplateUrl,
                ariaLabelledBy: modalOptions.ariaLabelledBy,
                ariaDescribedBy: modalOptions.ariaDescribedBy,
                size: modalOptions.size,
                openedClass: modalOptions.openedClass,
                appendTo: modalOptions.appendTo
            };

            var component = {};
            var ctrlInstance, ctrlInstantiate, ctrlLocals = {};

            if (modalOptions.component) {
                constructLocals(component, false, true, false);
                component.name = modalOptions.component;
                modal.component = component;
            } else if (modalOptions.controller) {
            	// 这个函数中会给scope对象增加modalInstance属性
                constructLocals(ctrlLocals, true, false, true);

                // the third param will make the controller instantiate later,private api
                // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
                /** $controller服务用来给controller 绑定一些额外的参数 **/
                ctrlInstantiate = $controller(modalOptions.controller, ctrlLocals, true, modalOptions.controllerAs);
                debugger;
                if (modalOptions.controllerAs && modalOptions.bindToController) {
                    ctrlInstance = ctrlInstantiate.instance;
                    ctrlInstance.$close = modalScope.$close;
                    ctrlInstance.$dismiss = modalScope.$dismiss;
                    angular.extend(ctrlInstance, {
                        $resolve: ctrlLocals.$scope.$resolve
                    }, providedScope);
                }

                ctrlInstance = ctrlInstantiate();

                if (angular.isFunction(ctrlInstance.$onInit)) {
                    ctrlInstance.$onInit();
                }
            }

            if (!modalOptions.component) {
                modal.content = tplAndVars[0];
            }

            $modalStack.open(modalInstance, modal);
            modalOpenedDeferred.resolve(true);

            function constructLocals(obj, template, instanceOnScope, injectable) {
                obj.$scope = modalScope;
                obj.$scope.$resolve = {};
                /** 给scope 对象增加了$uibModalInstance属性 **/
                if (instanceOnScope) {
                    obj.$scope.$uibModalInstance = modalInstance;
                } else {
                    obj.$uibModalInstance = modalInstance;
                }

                var resolves = template ? tplAndVars[1] : tplAndVars;
                angular.forEach(resolves, function(value, key) {
                    if (injectable) {
                        obj[key] = value;
                    }

                    obj.$scope.$resolve[key] = value;
                });
            }
        }, function resolveError(reason) {
            modalOpenedDeferred.reject(reason);
            modalResultDeferred.reject(reason);
        })['finally'](function() {
        if (promiseChain === samePromise) {
            promiseChain = null;
        }
    });

    return modalInstance;
};

```

总结是通过$controller服务来给controller增加一些额外的参数, 此时绑定了 $uibModalInstance 参数.

### angular 的 $controller 服务

[https://code.angularjs.org/1.5.9/docs/api/ngMock/service/$controller](https://code.angularjs.org/1.5.9/docs/api/ngMock/service/$controller)

$controller(constructor, locals, [bindings]);

** 参数 **

- constructor: function | string. 函数即控制器的构造函数. 如果是字符串会执行以下过程.
  - 检查通过该string是否被 $controllerProvider 注册过
  - 检查当前 scope[param] 是否能够返回一个函数
  - 如果  $controllerProvider#allowGlobals, 就检查全局window对象中是否可以通过该参数获取函数.
- locals: object. 该参数会注入到控制器中. 如 {$scope: {}, haha: {}, $uibModalInstance: {}}. 则这3个参数会注入到controller中, function ctrl ($scope, $uibModalInstance, haha) {}. 
- bindings: object. 向控制器中注入属性, 模仿 bindToController 的特性.
- return: 返回一个控制器的实例

** 用法 **

```javascript

angular.module('app', [])
.controller('memeCtrl', function ($scope, memeda) {
        'ngInject';
        console.log('$scope', $scope);
        $scope.name = '么么哒';
        console.log('memeda:', memeda);
    })
.directive('haha', function () {
        return {
            restrict: 'E',
            scope: {},
            controller ($scope, $uibModal, $controller) {
                'ngInject';
                // 创建一个scope对象, 新建一个子 $scope, 以及需要传递给子scope的其他参数, 该对象
                var scopeObj = Object.assign({}, $scope.$new(), {zhuru: '注入'});
                // 注入控制器, 此时会执行控制器memeCtrl的function. 并且注入了 $scope, memeda 2个参数
                var instance = $controller('memeCtrl', {$scope: scopeObj, memeda: {say: '大家好, 我是么么哒'}});
            },
            controllerAs: 'haha',
            template: '<div>我是哈哈组件</div>'
        };
    })
```


