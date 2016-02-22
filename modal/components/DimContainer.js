import React from 'react';
import Marty from 'marty';
import Dim from './Dim';

function handleHide() {
  this.app.modalActions.closeAll();
}

const DimContainer = Marty.createContainer(Dim, {
  listenTo: 'modalStore',
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  done(props) {
    return (
      <Dim
        ref="innerComponent"
        onHide={handleHide.bind(this)}
        path={this.context.router && this.context.router.getCurrentPath()}
        isActive={this.app.modalStore.dimIsActive()}
        zIndex={this.app.modalStore.activeModalCount()}
      />
    );
  },
});

export default DimContainer;
