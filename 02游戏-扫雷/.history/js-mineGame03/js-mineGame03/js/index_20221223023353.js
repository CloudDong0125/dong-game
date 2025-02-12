/**
 * 1、增加数组标注颜色，增加小红旗道具可点选
 * 2、单元格为数字吗，则显示数字；如果为空，则显示周边单元格，递归扩展
 * 3、点击有地雷的单元格则爆炸；选择小红旗点击，则标注小红旗，再次点击即取消
 */
class M {
    /**
     * 值的初始化
     */
    LEVEL = {} // 初始化游戏等级  表格：10*10 雷：20
    mineBox // 表格容器
    mineArray = null // 存储生成的雷
    tableArray = [] // 存储每个格子的信息
    flagArray = [] // 存储插旗
    fatherQ = ''
    isClickFlag = true

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
        this.resStart() // 重置

    }
    resStart() {
        this.mineBox.innerHTML = ""
        this.flagArray = []
        this.tableArray = []
        this.isClickFlag = true
        // var clickFlag = document.querySelector(".clickFlag")
        // clickFlag.style.backgroundColor = "#fff"


        var residue = document.querySelector('.residue')
        residue.innerHTML = `${this.LEVEL.mineNum}`

        this.mineArray = this.getMine() // 1. 随机生成所选配置对应数量的雷
        this.getTable() // 2. 生成表格 
        // this.getAllNum() // 3. 调用生成的雷数字
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
    // 获取DOM元素
    getAllNum() {
        var list = document.querySelectorAll(this.fatherQ + " div")
        console.log(list)
        for (let i = 0; i < list.length; i++) {
            this.getNum(list[i])
        }
    }

    /**
     *  点击事件
     */

    bindClick() {
        var that = this

        this.mineBox.onmousedown = function (e) {
            console.log(e.target.localName)
            if (e.target.localName != 'div') {

                return
            }
            if (e.button === 0) {
                // if (that.isClickFlag == true) {
                //     // 插旗
                //     that.getFlag(e.target)
                //     return
                // }
                // 点击查找雷数
                that.getNum(e.target)
            }
            if (e.button === 2) {
                that.getFlag(e.target)
            }


        }
        // 阻止默认的鼠标右键行为:去除右键后默认的菜单栏行为
        this.mineBox.oncontextmenu = function (e) {
            e.preventDefault()
        }
        // 判断是否可以旗子及样式
        // var clickFlag = document.querySelector(".clickFlag")
        // clickFlag.onclick = (e) => {
        //     console.log(e)
        //     if (this.isClickFlag) {
        //         clickFlag.style.backgroundColor = "#fff"
        //         this.isClickFlag = false
        //     } else {
        //         this.isClickFlag = true
        //         clickFlag.style.backgroundColor = "red"
        //     }
        // }
    }
    //才累效果
    cailei() {
        // 踩一个，则显示全部雷
        var mineArray = document.querySelectorAll(".mine")
        mineArray.forEach((cell) => {
            cell.classList.add('error')
        })
        setTimeout(() => {
            alert("踩雷了！！！游戏结束！！重新开始！")
            this.resStart() // 清空重置
        }, 100)
    }
    // 点击查找雷数字 type 判断是1:自动递归还是点击
    getNum(cell, type) {
        var that = this
        this.watchAllCell()
        if (!cell.classList.value || cell.classList.value.includes("flag")) {
            return
        }
        cell.parentNode.style.border = "none"
        cell.classList.remove("canFlag")


        //1. 当前单元格是雷，不标记数字
        if (cell.classList.contains("mine")) {
            this.cailei(cell)
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
        tableItem.checked = true // 校验已核对过的
        // 判断一圈是否有雷
        var mineNum = this.returnNum(tableItem)
        console.log("雷数：" + mineNum)
        if (cell.classList.value.includes("num")) {
            //查询并闪烁周围未操作的格子
            this.searchArea(tableItem, cell, mineNum)
        }
        if (!mineNum) {
            // 周围没有雷
            var {
                rowT,
                rowB,
                colL,
                colR
            } = this.returnArea(tableItem)
            for (var i = rowT; i <= rowB; i++) {
                for (var j = colL; j <= colR; j++) {
                    var checked = that.tableArray[i][j].checked
                    if (!checked) {
                        that.getNum(that.returnDOM(that.tableArray[i][j]), 1)
                    }

                }
            }
        } else {
            // 
            var colors = ['num-1 ', 'num-2', 'num-3', 'num-4', 'num-5', 'num-6', 'num-7']
            cell.classList.add(colors[mineNum])
            cell.innerHTML = mineNum
        }
    }
    // 点击插上旗子
    getFlag(cell) {
        console.log(cell)
        if (!cell.classList.value || !cell.classList.value.includes("showFlag")) {
            return
        }
        // 取消插旗
        var findIndex = this.flagArray.findIndex(i => i.dataset.id == cell.dataset.id)
        console.log(findIndex)
        if (findIndex > -1) {
            this.flagArray.splice(findIndex, 1)
            cell.classList.remove("flag")
        } else {

            // 插旗操作
            if (this.flagArray.length < this.LEVEL.mineNum) {
                // 可插旗
                this.flagArray.push(cell)
                console.log(this.flagArray)
                cell.classList.add("flag")

            } else {
                alert("不可以插旗了哦～～～")
            }
        }

        var residue = document.querySelector('.residue')
        residue.innerHTML = `${this.LEVEL.mineNum-this.flagArray.length}`
    }

    // DOM的js对象
    returnTableItem(cell) {
        var index = cell.dataset.id
        console.log(index)
        console.log(this.tableArray)
        //ES6二维数组转一维数组
        var flagTableData = this.tableArray.flat()
        // console.log(flagTableData)
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

        // console.log(obj)
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
    // js对象返回对应的div
    returnDOM(obj) {
        var divArr = document.querySelectorAll(this.fatherQ + " div")
        return divArr[obj.index]
    }


    searchArea(obj, cell, mineNum) {
        var showLighthigh = this.watchAreaFlag(obj, cell, mineNum)
        if (!showLighthigh) return;
        var list = this.returnAreaList(obj)
        list.forEach(i => {
            var dom = this.returnDOM(i)
            if (dom.classList.value && dom.classList.value.includes('showFlag')) {
                dom.classList.add("lighthigh")
                setTimeout(() => {
                    dom.classList.remove("lighthigh")
                }, 200)
            }
        })
    }
    //监听四周围格子
    watchAreaFlag(obj, cell, mineNum) {
        if (!mineNum) return true;
        var list = this.returnAreaList(obj)
        //旗子数
        var flagNum = 0
        //插对的旗帜数
        var rightFlag = 0
        list.forEach(i => {
            var dom = this.returnDOM(i)
            if (dom.classList.value && dom.classList.value.includes('flag')) {
                flagNum++;
            }
            if (dom.classList.value && dom.classList.value.includes('mine') && dom.classList.value.includes('flag')) {
                rightFlag++;
            }
        })
        //无插旗，去闪烁
        if (flagNum == 0) return true;
        //猜错了
        if (flagNum == mineNum && flagNum != rightFlag && flagNum != 0) {
            console.log("sila")
            this.cailei()
            return false;
        }
        if (flagNum == mineNum && flagNum == rightFlag) {
            //猜对了
            var that = this
            var {
                rowT,
                rowB,
                colL,
                colR
            } = this.returnArea(obj)
            for (var i = rowT; i <= rowB; i++) {
                for (var j = colL; j <= colR; j++) {
                    var checked = that.tableArray[i][j].checked
                    if (!checked) {
                        that.getNum(that.returnDOM(that.tableArray[i][j]), 1)
                    }

                }
            }
            return false
        }
        return true

    }
    //监听所有格子，判断游戏是否结束
    watchAllCell() {
        //ES6二维数组转一维数组
        var flagTableData = this.tableArray.flat()
        var noMine = flagTableData.filter(i => i.type != 'mine')
        var checkMine = noMine.filter(i => i.checked == true)
        console.log(flagTableData)
        // 插旗数
        var flag = 0
        for (var i = 0; i < this.flagArray.length; i++) {
            if (this.flagArray[i].classList.contains("mine")) {
                flag++
            }
        }
        // 插旗 == 雷位置
        if (flag == this.LEVEL.mineNum && noMine.length == checkMine.length) {
            setTimeout(() => {
                alert("恭喜！！！插旗正确！！游戏成功！")
                this.resStart()
            }, 100)
        }
    }

    // 返回 周围一圈雷的数量
    returnAreaList(obj) {
        var {
            rowT,
            rowB,
            colL,
            colR
        } = this.returnArea(obj)
        var list = []
        for (var i = rowT; i <= rowB; i++) {
            for (var j = colL; j <= colR; j++) {
                list.push(this.tableArray[i][j])
            }
        }
        return list
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
    s1.bindClick()
}

main()