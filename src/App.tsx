import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';

import "material-design-icons/iconfont/material-icons.css";
import 'react-toolbox/lib/commons.scss';
import './App.less';

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>App title</h1>
                <Button label="Click me!"/>
                <Button icon='bookmark' label='Bookmark' accent />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.body);
