<template>
    <div class="container">
        <BackNav :title="`EOS/USDT`" />
        <!-- <div class="headerTitle">
            <span class="back">&lt;</span>
            <span class="headerName">EOS/USDT</span>
        </div> -->
        <div class="content" :style="marginTopObject">
            <div class="headerInfo">
                <div class="headerInfoLeft">
                    <div class="currentPrice green">0.0165</div>
                    <div class="currentLimit green">+1.253%</div>
                </div>
                <div class="headerInfoRight">

                    <div class="infoItem">
                        <div class="infoItemLeft">高</div>
                        <div class="infoItemRight">0.1654</div>
                    </div>

                    <div class="infoItem">
                        <div class="infoItemLeft">低</div>
                        <div class="infoItemRight">0.008</div>
                    </div>

                    <div class="infoItem">
                        <div class="infoItemLeft">24H量</div>
                        <div class="infoItemRight">989745.224</div>
                    </div>
                </div>
            </div>
            <div id="hangQingPanel" class="hangQingPanel"></div>
            <div class="buySaleTable">
                <div class="buySaleTableTitle">
                    <h1>当前委托</h1>
                    <span class="newPrice">最新价 <span class="newPriceValue">1589.215</span></span>
                </div>

                <div class="buySaleTableContent">
                    <div class="buySaleTableContentTitle">
                        <div class="fangxiang">方向</div>
                        <div class="jiage">价格</div>
                        <div class="shuliang">数量</div>
                    </div>
                    <div class="salePanel">
                        <div class="buySaleTableContentTitle sale">
                            <div class="fangxiang">卖10</div>
                            <div class="jiage">1.54454</div>
                            <div class="shuliang">1</div>
                        </div>
                        <div class="buySaleTableContentTitle sale">
                            <div class="fangxiang">卖10</div>
                            <div class="jiage">1.54454</div>
                            <div class="shuliang">1</div>
                        </div>
                    </div>
                    <div class="salePanel">
                        <div class="buySaleTableContentTitle buy">
                            <div class="fangxiang">买2</div>
                            <div class="jiage">1.54454</div>
                            <div class="shuliang">1</div>
                        </div>
                        <div class="buySaleTableContentTitle buy">
                            <div class="fangxiang">买1</div>
                            <div class="jiage">1.54454</div>
                            <div class="shuliang">1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="buyBtn">
                    买入
                </div>
                <div class="saleBtn">
                    卖出
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createChart } from 'lightweight-charts'
import BackNav from '~/components/BackNav'
export default {
    components: {
        BackNav
    },
    data() {
        return {
            marginTopObject: '',
            chart: {},
            candleSeries: '',
            data: [],
            lastClose: '',
            lastIndex: '',
            targetIndex: '',
            targetPrice: '',
            currentIndex: '',
            currentBusinessDay: {
                day: 29,
                month: 5,
                year: 2019
            },
            ticksInCurrentBar: 0,
            currentBar: {},
            timer: null
        }
    },
    mounted() {
        this.isIPhoneX()
        this.data = [{
            time: '2019-10-12 14:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:10:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:20:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:30:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:40:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:50:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 15:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 16:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 17:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 18:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }, {
            time: '2019-10-12 14:00:05',
            open: 54.62,
            high: 55.50,
            low: 54.52,
            close: 54.90
        }]
        this.chart = createChart(document.getElementById('hangQingPanel'), { width: window.innerWidth, height: 300, background: 'red' })
        this.chart.applyOptions({
            layout: {
                backgroundColor: '#111d23',
                textColor: '#696969',
                fontSize: 12,
                fontFamily: 'Calibri'
            },
            grid: {
                vertLines: {
                    color: 'rgba(70, 130, 180, 0.5)',
                    style: 1,
                    visible: true
                },
                horzLines: {
                    color: 'rgba(70, 130, 180, 0.5)',
                    style: 1,
                    visible: true
                }
            },
            priceScale: {
                position: 'right',
                mode: 2,
                autoScale: false,
                invertScale: true,
                alignLabels: false,
                borderVisible: false,
                borderColor: '#555ffd',
                scaleMargins: {
                    top: 0.30,
                    bottom: 0.25
                }
            },
            crosshair: {
                vertLine: {
                    color: '#6A5ACD',
                    width: 0.5,
                    style: 1,
                    visible: true,
                    labelVisible: false
                },
                horzLine: {
                    color: '#6A5ACD',
                    width: 0.5,
                    style: 0,
                    visible: true,
                    labelVisible: true
                },
                mode: 1
            }
        })
        // this.chart.crosshair = { modes: 'Normal' }
        // this.chart.background = '#292929'
        // createChart(document.getElementById('hangQingPanel'), {
        //     width: window.width() - 5,
        //     height: 300,
        //     crosshair: {
        //         mode: LightweightCharts.CrosshairMode.Normal
        //     }
        // })
        // LightweightCharts.createChart(document.body, { width: 400, height: 300 });
        this.candleSeries = this.chart.addLineSeries()
        this.candleSeries.setData(this.data)
        this.lastClose = this.data[this.data.length - 1].close
        this.lastIndex = this.data.length - 1
        this.targetIndex = this.lastIndex + 105 + Math.round(Math.random() + 30)
        this.targetPrice = this.getRandomPrice()
        this.currentIndex = this.lastIndex + 1
        this.currentBar = {
            open: null,
            high: null,
            low: null,
            close: null,
            time: this.currentBusinessDay
        }
        this.candleSeries = this.chart.addCandlestickSeries()
        clearInterval(this.timer)
        this.countDown()
    },
    methods: {
        isIPhoneX() {
            const u = navigator.userAgent
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            // iPhone X、iPhone XS
            const isIPhoneX =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 3 &&
                window.screen.width === 375 &&
                window.screen.height === 812
            // iPhone XS Max
            const isIPhoneXSMax =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 3 &&
                window.screen.width === 414 &&
                window.screen.height === 896
            // iPhone XR
            const isIPhoneXR =
                /iphone/gi.test(window.navigator.userAgent) &&
                window.devicePixelRatio &&
                window.devicePixelRatio === 2 &&
                window.screen.width === 414 &&
                window.screen.height === 896

            if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
                this.marginTopObject = 'margin-top: 2rem'
            }
        },
        countDown() {
            if (!this.timer) {
                let _this = this
                setInterval(function() {
                    let deltaY = _this.targetPrice - _this.lastClose
                    let deltaX = _this.targetIndex - _this.lastIndex
                    let angle = deltaY / deltaX
                    let basePrice = _this.lastClose + (_this.currentIndex - _this.lastIndex) * angle
                    let noise = (0.1 - Math.random() * 0.2) + 1.0
                    let noisedPrice = basePrice * noise
                    _this.mergeTickToBar(noisedPrice)
                    if (++_this.ticksInCurrentBar === 5) {
                        // move to next bar
                        _this.currentIndex++
                        _this.currentBusinessDay = _this.nextBusinessDay(_this.currentBusinessDay)
                        _this.currentBar = {
                            open: null,
                            high: null,
                            low: null,
                            close: null,
                            time: _this.currentBusinessDay
                        }
                        _this.ticksInCurrentBar = 0
                        if (_this.currentIndex === 5000) {
                            _this.reset()
                            return
                        }
                        if (_this.currentIndex === _this.targetIndex) {
                            // change trend
                            _this.lastClose = noisedPrice
                            _this.lastIndex = _this.currentIndex
                            _this.targetIndex = _this.lastIndex + 5 + Math.round(Math.random() + 30)
                            _this.targetPrice = _this.getRandomPrice()
                        }
                    }
                }, 200)
            }
        },
        mergeTickToBar(price) {
            if (this.currentBar.open === null) {
                this.currentBar.open = price
                this.currentBar.high = price
                this.currentBar.low = price
                this.currentBar.close = price
            } else {
                this.currentBar.close = price
                this.currentBar.high = Math.max(this.currentBar.high, price)
                this.currentBar.low = Math.min(this.currentBar.low, price)
            }
            this.candleSeries.update(this.currentBar)
        },
        reset() {
            this.candleSeries.setData(this.data)
            this.lastClose = this.data[this.data.length - 1].close
            this.lastIndex = this.data.length - 1
            this.targetIndex = this.lastIndex + 5 + Math.round(Math.random() + 30)
            this.targetPrice = this.getRandomPrice()
            this.currentIndex = this.lastIndex + 1
            this.currentBusinessDay = {
                day: 29,
                month: 5,
                year: 2019
            }
            this.ticksInCurrentBar = 0
        },
        getRandomPrice() {
            return 10 + Math.round(Math.random() * 10000) / 100
        },
        nextBusinessDay(time) {
            let d = new Date()
            d.setUTCFullYear(time.year)
            d.setUTCMonth(time.month - 1)
            d.setUTCDate(time.day + 1)
            d.setUTCHours(0, 0, 0, 0)
            return {
                year: d.getUTCFullYear(),
                month: d.getUTCMonth() + 1,
                day: d.getUTCDate()
            }
        }
    }
}
</script>

<style lang="less" scoped>
body{
    background-color: #18232b;
}
.container {
    width: 100%;
    height: 100%;
    background-color: #18232b;
    .content{
        width: 100%;
        height: 100%;
        background-color: #18232b;
        margin-top: 100px;
        .headerInfo {
            margin-top: 10px;
            height: 210px;
            // background-color: #000;
            left: 0px;
            // top: 90px;
            width: 100%;
            text-align: center;
            // padding-top: 15px;
            font-size: 12px;
            border-bottom: 0px solid #efefef;
            border-top: 0px solid #efefef;

            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            .headerInfoLeft {
                width: 35%;
                padding-top: 20px;
                text-align: left;
                padding-left: 20px;
                .currentPrice {
                    font-size: 35px;
                }
                .currentLimit {
                    font-size: 14px;
                }
                .green {
                    color: rgb(19, 180, 70);
                }
            }
            .headerInfoRight {
                width: 40%;
                height: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .infoItem {
                    width: 100%;
                    height: 30px;
                    // background: #fff;
                    .infoItemLeft {
                        width: 40%;
                        height: 30px;
                        display: inline-block;
                        text-align: left;
                        line-height: 30px;
                        color: #AAA;
                    }
                    .infoItemRight {
                        width: 50%;
                        height: 30px;
                        display: inline-block;
                        text-align: right;
                        line-height: 30px;
                        color: #666;
                    }
                }
            }
        }

        .hangQingPanel {
            margin-top: 10px;
            // height: 300px;
            width: 100%;
            .tv-lightweight-charts table tr td canvas{
                background: #111d23;
            }
        }

        .buySaleTable {
            width: 100%;
            height: auto;
            padding: 10px 0px;
            border-bottom: 1px solid #efefef;
            // border-top: 2px solid #efefef;
            margin: 5px;
            left: 0;
            margin-top: 20px;

            .buySaleTableTitle{
                width: 100%;
                padding: 0px 15px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                h1 {
                    display: inline-block;
                    margin: 3px;
                    color: #fff;
                    font-weight: 600;
                }
                .newPrice{
                    color: #fff;
                    font-weight: 600;
                    padding-right: 20px;
                    .newPriceValue{}
                }
            }
            .buySaleTableContent {
                border-top: 1px solid #494949;
                padding-top: 8px;
                font-size: 12px;
                .buySaleTableContentTitle {
                    height: 65px;
                    line-height: 65px;
                    border-bottom: 1px solid #393939;
                    color: #fff;
                    .newPrice {
                        display: inline-block;
                        margin-right: 25px;
                        font-size: 12px;
                        margin-top: 5px;
                    }
                    .fangxiang {
                        display: inline-block;
                        width: 24%;
                        text-align: center;
                    }
                    .jiage {
                        display: inline-block;
                        width: 49%;
                        text-align: center;
                    }
                    .shuliang {
                        display: inline-block;
                        width: 24%;
                        text-align: center;
                    }
                }
                .salePanel{
                    .sale .fangxiang {
                        color: rgb(232, 109, 67);
                    }
                    .buy .fangxiang {
                        color: rgb(2, 194, 137);
                    }
                }
            }
        }

        .footer {
            // margin-top: 10px;
            position: fixed;
            height: 120px;
            line-height: 120px;
            background-color: #18232b;
            left: 0px;
            bottom: 0px;
            width: 100%;
            text-align: center;
            // padding-top: 15px;
            .buyBtn,.saleBtn {
                display: inline-block;
                width: 260px;
                height: 70px;
                line-height: 70px;
                margin: 3px;
                border-radius: 5px;
                color: snow;
            }
            .buyBtn {
                background-color: rgb(2, 194, 137);
            }
            .saleBtn {
                background-color: rgb(232, 109, 67);
            }
        }

    }
}
</style>
