import * as _ from "lodash";
import * as React from 'react';
import {ReactElement} from "react";
import * as ReactDOM from 'react-dom';
import {AppBar, List, ListItem, ListSubHeader, Layout, NavDrawer, Panel, Dialog} from "react-toolbox";
import {Table} from "react-toolbox/lib/table";

import "material-design-icons/iconfont/material-icons.css";
import 'react-toolbox/lib/commons.scss';
import './App.less';

class App extends React.Component<IAppProps, IAppState> {
    private folders: string[] = ["Hardware", "Work", "Books"];

    private notes: INoteModel[] = [{
        name: "Network configuration",
        lastChanged: new Date()
    }, {
        name: "Application passwords",
        lastChanged: new Date()
    }, {
        name: "Deployment process",
        lastChanged: new Date()
    }, {
        name: "Code guidelines",
        lastChanged: new Date()
    }];

    private noteListModel: Object = {
        name: {type: String},
        lastChanged: {type: Date}
    };

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isDrawerVisible: false,
            isNoteDialogVisible: false,
            selectedFolder: 0,
            selectedNotes: [],
            clickedNote: 0
        };
    }

    public render(): ReactElement<any> {
        let selectedFolder: string = this.folders[this.state.selectedFolder];

        return (
            <Layout className="app">
                <NavDrawer active={this.state.isDrawerVisible} onOverlayClick={this.handleToggleDrawer}>
                    <List selectable={true}>
                        <ListSubHeader caption="Folders"/>
                        {this.renderFolders()}
                        <ListSubHeader caption="Settings"/>
                        <ListItem caption="Sync" leftIcon="sync"/>
                        <ListItem caption="About" leftIcon="help"/>
                    </List>
                </NavDrawer>
                <Panel>
                    <AppBar title={selectedFolder} leftIcon="menu"
                            onLeftIconClick={this.handleToggleDrawer} flat/>
                    <Panel className="content">
                        <div onClick={this.handleToggleNoteDialog}>
                            <Table selectable multiSelectable={false} model={this.noteListModel} source={this.notes}
                                   selected={this.state.selectedNotes}
                                   onSelect={this.handleTableRowSelected}/>
                            <List>
                                <ListItem caption="Click inside the table in order to show the dialog."/>
                            </List>
                        </div>

                        <Dialog className="note-details" title={this.getSelectedNote()}
                                active={this.state.isNoteDialogVisible} onOverlayClick={this.handleToggleNoteDialog}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ligula in nunc
                            tincidunt maximus. Phasellus laoreet interdum erat quis aliquet. Vestibulum elementum ante
                            sapien, eu venenatis sapien pulvinar in. Aliquam finibus egestas tortor, at auctor leo
                            laoreet ullamcorper. Aenean erat justo, vehicula convallis sem ut, ultrices lobortis
                            lectus. Sed eu mi maximus, finibus lectus ut, vulputate urna. Vivamus sollicitudin
                            lobortis dictum.</p>
                        </Dialog>
                    </Panel>
                </Panel>
            </Layout>
        );
    }

    private renderFolders(): ReactElement<any>[] {
        return _.map(this.folders, (folderName: string, index: number): ReactElement<any> =>
            <ListItem key={index + folderName} caption={folderName} leftIcon="folder" selectable={true}
                      onClick={() => this.handleFolderClicked(index)}/>
        );
    }

    handleToggleDrawer = () => {
        this.setState({
            isDrawerVisible: !this.state.isDrawerVisible
        });
    };

    handleFolderClicked = (selectedFolder) => {
        this.setState({
            selectedFolder
        });
    };

    handleTableRowSelected = (selectedNotes) => {
        console.log("Selected row: ", selectedNotes);

        this.setState({
            selectedNotes
        });
    };

    handleToggleNoteDialog = (ev) => {
        this.setState({
            isNoteDialogVisible: !this.state.isNoteDialogVisible
        });
    };

    getSelectedNote(): string {
        return this.notes[this.state.clickedNote].name;
    }
}

interface INoteModel {
    name: string;
    lastChanged: Date;
}

interface IAppProps {
}

interface IAppState {
    isDrawerVisible?: boolean;
    isNoteDialogVisible?: boolean;
    selectedNotes?: number[];
    selectedFolder?: number;
    clickedNote?: number;
}

ReactDOM.render(<App/>, document.body);
