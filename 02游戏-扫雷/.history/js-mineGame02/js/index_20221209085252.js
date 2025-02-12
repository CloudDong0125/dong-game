/**
 * 1、生成随机 雷
 * 2、生成表格 并渲染雷
 * 3、生成雷数 并渲染
 */

class M {
    /**
     * 值的初始化
     */
    LEVEL = {} // 初始化游戏等级  表格：10*10 雷：20
    mineBox // 表格容器
    mineArray = null // 存储生成的雷
    tableArray = [] // 存储每个格子的信息
    fatherQ = ''

    /**
     *  游戏初始化函数
     */
    showGetMineGetNum({
        fatherQ,
        LEVEL
    }) {
        this.fatherQ = fatherQ || '.mineBox'
        this.mineBox = document.querySelector(this.fatherQ)
        this.LEVEL = LEVEL || this.LEVEL
        this.mineArray = this.getMine() // 1. 随机生成所选配置对应数量的雷
        this.getTable() // 2. 生成表格
        this.getAllNum() // 3. 调用生成的雷数字
    }

    // 1.生成地雷并打乱
    getMine() {
        var arr = new Array(this.LEVEL.row * this.LEVEL.col)
        for (var i = 0; i < arr.length; i++) {
            arr[i] = i
        }
        // 打乱这个数组
        arr.sort(() => 0.5 - Math.random())
        // 只保留对应数量的数组长度
        return arr.slice(0, this.LEVEL.mineNum)
    }

    // 2. 生成表格
    getTable() {
        var table = document.createElement("table")
        var index = 0 // 初始化下标
        for (var i = 0; i < this.LEVEL.row; i++) {
            var tr = document.createElement("tr") // 行
            this.tableArray[i] = []
            for (var j = 0; j < this.LEVEL.col; j++) {
                var td = document.createElement("td") // 列
                var div = document.createElement("div")
                // 对象：存储每个格子的信息
                this.tableArray[i][j] = {
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
                div.classList.add("showFlag")

                // 当前格子是否是雷
                if (this.mineArray.includes(this.tableArray[i][j].index)) {
                    this.tableArray[i][j].type = "mine"
                    div.classList.add("mine")
                } else {}

                td.appendChild(div)
                tr.appendChild(td)

                index++ // 自增
            }
            table.appendChild(tr)
        }
        // console.log(table)
        this.mineBox.appendChild(table) // 将生成的表格添加到对应的区域（定义样式）
        console.log(this.tableArray)
    }

    // 3.搜索雷数
    getNum(cell) {
        //1. 当前单元格是雷，不标记数字
        if (cell.classList.contains("mine")) {
            cell.classList.add('error')
            return
        }
        //2. 当前单元格不是雷,显示雷数
        cell.classList.remove("showFlag")
        // 获取DOM元素在tableArray里面所对应的对象
        var tableItem = this.returnTableItem(cell)
        // console.log(tableItem)
        // 判断临界
        if (!tableItem) {
            return
        }
        // 判断一圈是否有雷
        var mineNum = this.returnNum(tableItem)
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
    returnTableItem(cell) {
        var index = cell.dataset.id
        // console.log(index)
        // console.log(this.tableArray)
        //ES6二维数组转一维数组
        var flagTableData = this.tableArray.flat()
        return flagTableData.filter(item => item.index == index)[0]
    }

    // 返回 周围一圈雷的数量
    returnNum(obj) {
        console.log(obj)
        var count = 0
        var {
            rowT,
            rowB,
            colL,
            colR
        } = this.returnArea(obj)
        for (var i = rowT; i <= rowB; i++) {
            for (var j = colL; j <= colR; j++) {
                if (this.tableArray[i][j].type == "mine") {
                    count++
                }
            }
        }
        return count
    }

    // 返回 计算的四周区域
    returnArea(obj) {
        console.log(obj)
        // 上下
        var rowT = obj.row - 1 < 0 ? 0 : obj.row - 1
        var rowB = obj.row + 1 === this.LEVEL.row ? this.LEVEL.row - 1 : obj.row + 1

        // 左右
        var colL = obj.col - 1 < 0 ? 0 : obj.col - 1
        var colR = obj.col + 1 === this.LEVEL.col ? this.LEVEL.col - 1 : obj.col + 1

        return {
            rowT,
            rowB,
            colL,
            colR
        }


    }
     // 获取DOM元素
     getAllNum() {
        var list = document.querySelectorAll(this.fatherQ + " div")
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            this.getNum(list[i])
        }
    }


}

/**
 * 入口
 */
function main() {

    var s1 = new M()
    // 1.游戏的初始化
    s1.showGetMineGetNum({
        fatherQ: '#mineBox',
        LEVEL: {
            row: 10,
            col: 10,
            mineNum: 20
        }
    })
    var s = new M()
    // 1.游戏的初始化
    s.showGetMineGetNum({
        fatherQ:'#mineBox2',
        LEVEL: {
            row: 10,
            col: 10,
            mineNum: 20
        }
    })
}

main()