var fs = require('fs');

/**
 * [readFileList description]
 * @param  {[type]} path     [路径]
 * @param  {[type]} filesList [文件地址数组]
 * @return {[type]}          [description]
 * 递归获取文件的url
 */
function readFileList(path,filesList){
	// 获取路径里的文件名的数组
	var files = fs.readdirSync(path);
	files.forEach(function(fileName){
		var stat = fs.statSync(path+fileName);
		if(stat.isDirectory()){
			readFileList(path+fileName+'/',filesList);
		}
		if(stat.isFile()){
			// 定义一个对象存放路径和文件名
			var fileObj = {};
			var suffixArr = fileName.split('.');
			var suffix = suffixArr[suffixArr.length-1];
			var name = fileName.substr(0,(fileName.lastIndexOf(suffix)-1));
			fileObj.url = path+fileName;
			fileObj.suffix = suffix;
			fileObj.name = name;
			filesList.push(fileObj);
		}
	});
}

//获取文件
var getFiles = {
	/**
	 * [getFileList 获取文件列表]
	 * @param  {[string]}  path   [路径]
	 * @param  {[string]}  type   [文件类型(可选),默认为所有文件]
	 * @param  {[boolean]} suffix [是否需要返回出文件类型(可选),默认为否]
	 * @return {[array]}          [返回一个数组]
	 */
	getFileList: function(path,type,suffix){
		var _filesList = [];
		var filesList = [];
		readFileList(path,_filesList);
		if(type != null){
			switch (type) {
				case "images":
					// 类型为图片
					_filesList.forEach(function(e,index){
						if(/jpg|gif|bmp|png$/.test(e.suffix)){
							console.log(e.suffix);
							var fileObj = {};
							fileObj.url = e.url;
							fileObj.id = e.name;
							if(suffix){
								fileObj.suffix = e.suffix;
							}
							filesList.push(fileObj);
						}
					});
					break;
				case "css":
					// 类型为css
					_filesList.forEach(function(e,index){
						if(/css$/.test(e.suffix)){
							console.log(e.suffix);
							var fileObj = {};
							fileObj.url = e.url;
							fileObj.id = e.name;
							if(suffix){
								fileObj.suffix = e.suffix;
							}
							filesList.push(fileObj);
						}
					});
					break;
				case "js":
					// 类型为js
					console.log('js');
					_filesList.forEach(function(e,index){
						if(/js$/.test(e.suffix)){
							console.log(e.suffix);
							var fileObj = {};
							fileObj.url = e.url;
							fileObj.id = e.name;
							if(suffix){
								fileObj.suffix = e.suffix;
							}
							filesList.push(fileObj);
						}
					});
				break;
			}
			if(!filesList){
				console.log('\n sorry, no file \n please check whether the selection of file path \n');
			}
			console.log(filesList);
			return filesList;
		}else{
			if(!_filesList){
				console.log('\n sorry, no file \n please check whether the selection of file path \n');
			}
			console.log(_filesList);
			return _filesList;
		}
	},
};

var allFiles = getFiles.getFileList('./','images');
fs.writeFile('manifest.json', JSON.stringify(allFiles, null, 2), function(){
	console.log('\n manifest.json create success.\n');
});
