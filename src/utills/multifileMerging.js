const fs = require('fs').promises;
const path = require('path');
 
// 要合并多少个json文件，在这里列出它们的路径
const jsonFiles = [
  { source: '../../server/login.json', key: 'login' },
  { source: '../../server/b.json', key: 'goodsList' },
];
 
// 初始化合并后的对象
const mergedData = {};
 
// 异步函数，用于读取和合并JSON文件内容
const mergeJsonFiles = async () => {
  try {
    // 遍历所有JSON文件
    for (const { source, key } of jsonFiles) {
      // 读取文件内容
      const fileContent = await fs.readFile(source, 'utf8');
      // 解析JSON内容
      const data = JSON.parse(fileContent);
      console.log(data)
      // 将解析后的数据添加到合并后的对象中
      if (data.hasOwnProperty(key)) {
        mergedData[key] = data[key];
      } else {
        console.warn(`文件 ${source} 中不存在键 ${key}。跳过...`);
      }
    }
 
    // 将合并后的对象转换为JSON字符串
    const mergedJsonString = JSON.stringify(mergedData, null, 2);
 
    // 将合并后的JSON字符串写入db.json文件
    await fs.writeFile(path.join(__dirname, '../../server/db.json'), mergedJsonString);
 
    console.log('所有JSON文件已成功合并到db.json文件中',mergedJsonString);
  } catch (error) {
    console.error('合并过程中发生错误：', error);
  }
};
 
// 调用函数，开始合并过程
mergeJsonFiles();