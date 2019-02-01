import * as React from 'react';
import 'react-fa';

const ProjectBatchComponent = () => {
    return (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0">
            <thead>
                <tr>
                    <th className="th-sm">Week
                    </th>
                    <th className="th-sm">Day
                    </th>
                    <th className="th-sm">Titile
                    </th>
                    <th className="th-sm">Mode
                    </th>
                    <th className="th-sm">Owner
                    </th>
                    <th className="th-sm">Schedule Date
                    </th>
                    <th className="th-sm">Status
                    </th>
                    <th className="th-sm">Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>Insurance Nex Links</td>
                    <td>Self-Reading</td>
                    <td>Tom</td>
                    <td>2011/04/25</td>
                    <td>1/1</td>
                    <td><i className="fa fa-edit" /><i className="fa fa-remove" /></td>
                </tr>
            </tbody>
        </table>
    );
};

export default ProjectBatchComponent;