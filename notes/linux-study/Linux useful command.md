# Linux Useful Command

## 剪贴板

pbcopy  : 表示复制剪切版
pbpaste ：表示粘贴剪切版

```bash

~]# cat a.txt | pbcopy   #将a.txt文件类容写入剪切板，相当于 cmd + C 
~]# pbpaste              #将刚刚存入剪切板的a.txt内容复制到终端，相当于 cmd + v

```

其他常用的方法


```bash

#统计剪贴板中文本的行数
pbpaste | wc -l 

#统计剪贴板中文本的单词数
pbpaste | wc -w 

#对剪贴板中的文本行进行排序后重新写回剪贴
pbpaste | sort | pbcopy 

#对剪贴板中的文本行进行倒序后放回剪贴板
pbpaste | rev | pbcopy 

#移除剪贴板中重复的文本行，然后写回剪贴板
pbpaste | sort | uniq | pbcopy 

#找出剪贴板中文本中存在的重复行，并复制后写回剪贴板（包含重复行的一行）
pbpaste | sort | uniq -d | pbcopy 

#找出剪贴板中文本中存在的重复行，并复制后写回剪贴板（不包含重复行）
pbpaste | sort | uniq -u | pbcopy 

#对剪贴板中的 HTML 文本进行清理后写回剪贴板
pbpaste | tidy | pbcopy 

#显示剪贴板中文本的前 5 行
pbpaste | head -n 5 

#显示剪贴板中文本的最后 5 行
pbpaste | tail -n 5 

#将剪贴板中文本里存在的 Tab 跳格符号转成空格
pbpaste | expand | pbcopy

```

## 查看当前用户的SHELL

```bash
finger [USERNAME]
```

如：

```bash

~]# finger x3927

# 输出
Login: x3927          			Name: xuzhichao
Directory: /Users/x3927             	Shell: /bin/bash
On since Mon Aug 28 13:08 (CST) on console, idle 21:44 (messages off)
On since Tue Aug 29 10:19 (CST) on ttys000
On since Tue Aug 29 10:11 (CST) on ttys001, idle 0:26
On since Mon Aug 28 15:14 (CST) on ttys002, idle 16:52
On since Tue Aug 29 10:22 (CST) on ttys003, idle 0:27
No Mail.
No Plan.

```