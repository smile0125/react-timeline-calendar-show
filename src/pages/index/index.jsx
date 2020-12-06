import React, { Component } from "react";
import { Row, Col } from "antd";
import {
  timeTitleRowStyle,
  timeTitleCol,
  defultTimeLine,
} from "./utils/index.js";
class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    const { dataSource } = this.props;
  }

  render() {
    let {
      title = "文本",
      data = [],
      dataSource,
      timeLine = defultTimeLine,
      defauleTimeWidth = 100,
    } = this.props;
    const length = timeLine.length;
    const { list = [], pointBlock = [] } = dataSource;
    return (
      <div style={{ overflow: "auto" }}>
        <Row>
          <Col>
            <Row style={{ ...timeTitleRowStyle }}>
              <Col
                style={{
                  maxWidth: `${(length + 3) * defauleTimeWidth}px`,
                  ...timeTitleCol,
                }}
              >
                <Row style={{ display: "flex" }}>
                  <Col style={{ width: defauleTimeWidth }}>班次名称</Col>
                  <Col style={{ width: defauleTimeWidth }}>适用人员</Col>
                  {timeLine.map((time) => {
                    return (
                      <Col
                        key={time}
                        style={{ width: defauleTimeWidth, ...timeTitleCol }}
                      >
                        {time}
                      </Col>
                    );
                  })}
                </Row>
                {(list || []).map((item, classIndex) => {
                  const { taskInfo, classInfo, personInfo } = item;
                  const { name, time } = classInfo;
                  return (
                    <Row key={classIndex}>
                      <Col style={{ width: defauleTimeWidth }}>
                        {name}
                        <br />
                        {time}
                      </Col>
                      <Col style={{ width: defauleTimeWidth }}>
                        {personInfo}
                      </Col>

                      <Col
                        style={{ minWidth: `${length * defauleTimeWidth}px` }}
                      >
                        {pointBlock[classIndex].map((rowItem, rowIndex) => {
                          return (
                            <Row key={`${classIndex}-${rowIndex}`}>
                              {rowItem.map((colItem, colIndex) => {
                                return (
                                  <Col
                                    key={`${classIndex}-${rowIndex}-${colIndex}`}
                                    style={{
                                      minWidth: defauleTimeWidth / 2,
                                      maxWidth: defauleTimeWidth / 2,
                                    }}
                                  >
                                    {taskInfo.map(
                                      ({ pointRow, pointCol, context }) => {
                                        return (
                                          pointRow === rowIndex &&
                                          pointCol === colIndex && (
                                            <div>{context}</div>
                                          )
                                        );
                                      }
                                    )}
                                  </Col>
                                );
                              })}
                            </Row>
                          );
                        })}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
