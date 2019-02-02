import * as React from 'react';
import 'react-fa';
import { IModalDialogProps } from '../models/ModalDialog';

const ModalComponent = (props: IModalDialogProps) => {
  return (
    <div id="myModal" role="dialog" className="modal-fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" onClick={() => props.showModal(false)} className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">CONFIRMATION</h4>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={props.onOk} className="btn btn-primary">OK</button>
            <button type="button" onClick={() => props.showModal(false)} className="btn btn-default" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalComponent;