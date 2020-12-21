## react-timeline-calendar
## Installing
```
npm i react-timeline-calendar
```
## Example
```
import React from 'react';
import Schedule from 'react-timeline-calendar';
class FirstPage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dataSource: {
                startTime: '2020/11/30 7:00',
                endTime: '2020/11/30 22:00',
                list: [{
                    rowId: '1',
                    taskInfo: [
                        {
                        colId: '1-1',
                        pointRow: 0,
                        pointCol: 0,
                        startTime: '2020/11/30 7:00',
                        endTime: '2020/11/30 8:00',
                        timeLength: 2,
                        isImportant: true,
                        context: '文本标题',
                        des: '文本描述'
                    }]
                }]
            }
        }
    }
    render() {
        return (
            <Schedule dataSource={this.props.dataSource} />
        );
    }
};
export default FirstPage;
```
