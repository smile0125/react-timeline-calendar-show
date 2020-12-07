import React, { Component } from "react";
import { Row, Col } from "antd";
import {data} from './data.js';
import {
    generateMatrix,
    getTimeData,
} from "./utils/index.js";
import './index.scss';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onceTimeLength: 60 * 60 * 1000 / 2,
            pointBlock: [],
            timeData: [],
            timeAllData: [],
            dataSource: {list:[]},
            defauleTimeWidth: 100,
        }
    }

    componentDidMount() {
        const dataSource = data;
        this.setState({ dataSource });
        const { onceTimeLength } = this.state;
        const pointBlock = generateMatrix(dataSource);
        this.setState({ pointBlock });
        const { startTime = `${new Date().toLocaleDateString()} 7:00`, endTime = `${new Date().toLocaleDateString()} 22:00` } = dataSource;
        const { timeData, timeAllData } = getTimeData({ startTime, endTime, onceTimeLength });
        this.setState({ timeData, timeAllData })
    }

    render() {
        const { dataSource: { list=[] }, timeData, defauleTimeWidth, pointBlock } = this.state;
        const length = timeData.length;
        let itemWidthStyle = { width: `${defauleTimeWidth}px` };
        return (
            <div style={{ overflow: "auto" }} className='targetBox'>
                <Row>
                    <Col>
                        {/* 渲染时间段标题 */}
                        <Row className='timeTitleRow' style={{ maxWidth: `${(length) * defauleTimeWidth}px` }}>
                            <Col className='timeTitleCol'>
                                <Row style={{ display: 'flex', width: `${(length) * defauleTimeWidth}px`, padding: '0 0.5rem' }}>
                                    {
                                        timeData.map((time) => {
                                            return <Col key={time} className='timeTitleCol' style={{ ...itemWidthStyle, minWidth: defauleTimeWidth, maxWidth: defauleTimeWidth }}>{time}</Col>;
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>

                        {/* 渲染行列 */}
                        {
                            (list || []).map((item, classIndex) => {
                                const { taskInfo } = item;
                                return <Row key={classIndex} className='targetBoxOutRow' style={{ width: `${(length) * defauleTimeWidth}px` }}>
                                    <Col className='timeCol centerPointBox' style={{ minWidth: `${length * defauleTimeWidth}px` }}>
                                        {
                                            (pointBlock[classIndex] || []).map((rowItem, rowIndex) => {
                                                return <Row className='targetBoxRow' key={`${classIndex}-${rowIndex}`}>
                                                    {
                                                        rowItem.map((colItem, colIndex) => {
                                                            return <Col
                                                                key={`${classIndex}-${rowIndex}-${colIndex}`}
                                                                data-point={`${classIndex}-${rowIndex}-${colIndex}`}
                                                                data-classindex={classIndex}
                                                                data-pointrow={rowIndex}
                                                                data-pointcol={colIndex}
                                                                data-matrix={colItem[0]}
                                                                className='targetBoxCol'
                                                                style={{ width: defauleTimeWidth / 2 }}
                                                                style={{ minWidth: defauleTimeWidth / 2, maxWidth: defauleTimeWidth / 2 }}
                                                            >
                                                                {
                                                                    taskInfo.map(({ des, startTime, endTime, pointRow, pointCol, timeLength, context, isImportant, active = false, colId }, taskIndex) => {
                                                                        return pointRow === rowIndex
                                                                            && pointCol === colIndex
                                                                            && <div
                                                                                key={`${pointRow}-${pointCol}-${colId}`}
                                                                                data-colid={colId}
                                                                                data-taskindex={taskIndex}
                                                                                data-classindex={classIndex}
                                                                                data-pointrow={pointRow}
                                                                                data-pointcol={pointCol}
                                                                                data-timelength={timeLength}
                                                                                data-isimportant={isImportant}
                                                                                data-title={context}
                                                                                data-starttime={startTime}
                                                                                data-endtime={endTime}
                                                                                draggable
                                                                                className={`target ${isImportant && 'important'} ${active ? 'active' : 'unActive'}`}
                                                                                style={{ width: `${(timeLength * defauleTimeWidth / 2)}px` }}
                                                                            >
                                                                                <p className='contextTitle' title={context}>{context}</p>
                                                                                <p className='contextDes' title={des}>{des}</p>
                                                                            </div>;
                                                                    })
                                                                }
                                                            </Col>;
                                                        })
                                                    }
                                                </Row>;
                                            })
                                        }
                                    </Col>
                                </Row>;
                            })
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Index;
