import {DatasetSectionFactory, Icons, Button} from '@kepler.gl/components';
import MatchTrajectoryModal from './match-trajectory-modal'

import React from 'react';
import styled from 'styled-components';


const StyledDatasetTitle = styled.div`
  line-height: ${props => props.theme.sidePanelTitleLineHeight};
  font-weight: 400;
  letter-spacing: 1.25px;
  color: ${props => props.theme.subtextColor};
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => (props.showDatasetList ? '16px' : '4px')};
`;

const StyledDatasetSection = styled.div`
  border-bottom: 1px solid ${props => props.theme.sidePanelBorderColor};
`;

class FetchTrajectoryLibraryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInactive: true
        };
    }

    onClick = () => {
        console.log("fetch history trajectories...")
    }

    render() {
        return (
            <Button
              className="fetch-trajlib-button"
              onClick={this.onClick}
              inactive={!this.state.isInactive}
              width="140px"
              style={{paddingLeft: "2px", paddingRight: "2px"}}
              floating
            >
                <Icons.Add width="12px" />
                Fetch Sections
            </Button>
        )
    }
}

class MatchTrajectoryButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInactive: true,
            modalVisible: false,
        };
    }

    onClick = () => {
        console.log("open match trajectory modal...");
        this.setState({modalVisible: true});
    }

    onModalClose = () => {
        console.log("modal is closing!");
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <div>
                <Button
                  className="match-trajectory-button"
                  onClick={this.onClick}
                  inactive={!this.state.isInactive}
                  width="140px"
                  style={{paddingLeft: "2px", paddingRight: "2px"}}
                  floating
                >
                    <Icons.Add width="12px" />
                    Match TRAJ
                </Button>
                <MatchTrajectoryModal visible={this.state.modalVisible} onClose={this.onModalClose} />
            </div>
        )
    }
}

const CustomDatasectionFactory = (...deps) => {
    const SourceDataCatalog = deps[0];
    const AddDataButton = deps[1];

    const DatasetSectionWrapper = props => {
        const {
            datasets,
            showDatasetTable,
            updateTableColor,
            showDeleteDataset,
            removeDataset,
            showDatasetList,
            showAddDataModal
          } = props;
          const datasetCount = Object.keys(datasets).length;
      
          return (
            <StyledDatasetSection>
              <StyledDatasetTitle >
                <FetchTrajectoryLibraryButton />
                <MatchTrajectoryButton />
              </StyledDatasetTitle>
              <StyledDatasetTitle showDatasetList={showDatasetList}>
                <span style={{marginTop: "4px"}}>Datasets{datasetCount ? `(${datasetCount})` : ''}</span>
                <AddDataButton onClick={showAddDataModal} isInactive={!datasetCount} />
              </StyledDatasetTitle>
              {showDatasetList && (
                <SourceDataCatalog
                  datasets={datasets}
                  showDatasetTable={showDatasetTable}
                  updateTableColor={updateTableColor}
                  removeDataset={removeDataset}
                  showDeleteDataset={showDeleteDataset}
                />
              )}
            </StyledDatasetSection>
          );
    };

    return DatasetSectionWrapper;
};

CustomDatasectionFactory.deps = DatasetSectionFactory.deps;
export default CustomDatasectionFactory;
