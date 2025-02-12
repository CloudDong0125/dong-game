/**
 *  主要逻辑
 */

// 函数的方式来编写 

var mineArray = null // 用于存储生成的雷
var mineBox = document.querySelector(".mineBox") // 表格容器
var tableData = [] // 存储每个格子的信息



/**
 *  游戏初始化函数
 */
function initGame() {
    //1. 随机生成所选配置对应数量的雷
    mineArray = initMine()
    // console.log(mineArray)
    // 2.双重for循环--生成新的表格
    var table = document.createElement("table")
    var index = 0 // 初始化下标
    for (var i = 0; i < curLevel.row; i++) {
        var tr = document.createElement("tr") // 行
        tableData[i] = []
        for (var j = 0; j < curLevel.col; j++) {
            var td = document.createElement("td") // 列
            var div = document.createElement("div")
            // 对象：存储每个格子的信息
            tableData[i][j] = {
                row: i,
                col: j,
                type: "number",
                value: 0,
                index,
                checked: false
            }
            // 添加下标
            div.dataset.id = index
            // 标记：表示可以插旗
            div.classList.add("canFlag")

            // 当前格子是否是雷
            if (mineArray.includes(tableData[i][j].index)) {
                tableData[i][j].type = "mine"
                div.classList.add("mine")
            } else {}

            td.appendChild(div)
            tr.appendChild(td)

            index++ // 自增
        }
        table.appendChild(tr)
    }
    // console.log(table)
    mineBox.appendChild(table) // 将生成的表格添加到对应的区域（定义样式）
    console.log(tableData)
    getAll() // 调用生成的雷数字

}

// 生成地雷方法
function initMine() {
    var arr = new Array(curLevel.row * curLevel.col)
    for (var i = 0; i < arr.length; i++) {
        arr[i] = i
    }
    // 打乱这个数组
    arr.sort(() => 0.5 - Math.random())
    // 只保留对应数量的数组长度
    return arr.slice(0, curLevel.mineNum)
}

// 获取DOM元素
function getAll() {
    var list=document.querySelectorAll(".mineBox div")
    console.log(list)
    for (let i = 0; i < list.length; i++) {
        searchBox(list[i])
    }
}

// 区域搜索
function searchBox(cell) {
    // console.log(cell)
    //1. 当前单元格是雷，游戏结束
    if (cell.classList.contains("mine")) {
        cell.classList.add('error')
        return
    }
    //2. 当前单元格不是雷,显示雷数
    // 如果有雷，显示数量
    // 如果没有雷，继续递归
    getAround(cell)
}

// 搜索周围九宫格
function getAround(cell) {
    // cell.parentNode.style.border = 'none'
    cell.classList.remove("canFlag")
    // 获取DOM元素在tableData里面所对应的对象
    var tableItem = getTableItem(cell)
    // console.log(tableItem)
    // 判断临界
    if (!tableItem) {
        return
    }
    // 判断一圈是否有雷
    var mineNum = findMineNum(tableItem)
    console.log(mineNum)
    if (!mineNum) {
        // 周围没有雷
    } else {
        // 
        var colors = ['num-1 ', 'num-2', 'num-3', 'num-4', 'num-5', 'num-6', 'num-7']
        cell.classList.add(colors[mineNum])
        cell.innerHTML = mineNum
    }
}

// DOM的js对象
function getTableItem(cell) {
    var index = cell.dataset.id
    // console.log(index)
    console.log(tableData)
    //ES6二维数组转一维数组
    var flagTableData = tableData.flat()
    console.log(flagTableData)
    return flagTableData.filter(item => item.index == index)[0]


}

// 返回周围一圈雷的数量
function findMineNum(obj) {
    console.log(obj)
    var count = 0
    var {
        rowT,
        rowB,
        colL,
        colR
    } = getBound(obj)
    for (var i = rowT; i <= rowB; i++) {
        for (var j = colL; j <= colR; j++) {
            if (tableData[i][j].type == "mine") {
                count++
            }
        }
    }
    return count
}

// 返回对应的四周边界
function getBound(obj) {
    console.log(obj)
    // 上下
    var rowT = obj.row - 1 < 0 ? 0 : obj.row - 1
    var rowB = obj.row + 1 === curLevel.row ? curLevel.row - 1 : obj.row + 1

    // 左右
    var colL = obj.col - 1 < 0 ? 0 : obj.col - 1
    var colR = obj.col + 1 === curLevel.col ? curLevel.col - 1 : obj.col + 1

    return {
        rowT,
        rowB,
        colL,
        colR
    }

}

function main() {
    // 1.游戏的初始化
    initGame()
}

main()