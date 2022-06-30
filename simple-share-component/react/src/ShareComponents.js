import { React } from './lib';
import { Result, Card } from 'antd';
import { setShare, ReactComponentShare } from '@satumjs/component-share';
import 'antd/dist/antd.less';

function Empty(props) {
  return <Result title={props.title || '这是来自父级微应用的共享组件'} />
}

class RecommendedBitCard extends React.Component {
  render() {
    return (
      <Card title="父级共享组件标题" extra={<a href="#more">More</a>} style={{ width: 300, marginBottom: '16px' }}>
        <p>父级共享组件内容</p>
      </Card>
    );
  }
}

setShare('Empty', Empty);
setShare('RecommendedBitCard', RecommendedBitCard);

export default function ShareComponents() {
  return (<>
    <ReactComponentShare name="Empty" title="共享组件在所属微应用下使用" />
    <ReactComponentShare name="EmptyNotExisted" />
    <div id="storeWrapper"></div>
  </>);
}