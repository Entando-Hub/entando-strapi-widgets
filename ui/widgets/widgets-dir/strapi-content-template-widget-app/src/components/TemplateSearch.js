import React, { Component } from 'react'
import { getSanitizedCollectionTypes } from '../helpers/helpers';
import { FormattedMessage } from "react-intl";
export default class TemplateSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionType: [],
            selectedCollectionType: "All"
        };
    }

    componentDidMount = async () => {
        this.getCollectionType();
    }

    getCollectionType = async () => {
        const sanitizedCollectionTypes = await getSanitizedCollectionTypes();
        this.setState({ collectionType: sanitizedCollectionTypes });
    }

    collectionTypeOnChange = (event) => this.setState({ selectedCollectionType: event.target.value });

    collectionTypeOnClick = () => this.props.collectionTypeOnChange(this.state.selectedCollectionType);

    render() {
        return (
            <div className="well well-height well-container-position">
                <div className="container-fluid col-lg-12">
                    <div className="show-grid row">
                        <div className="col-lg-1 search-label-size"><FormattedMessage id="app.search" /></div>
                        <div className="col-lg-11"></div>
                    </div>
                    <div className="show-grid row tw-search-box-height col-lg-12">

                        <div className="col-lg-1"></div>
                        <div className="col-lg-3 tw-type-label">
                            <FormattedMessage id="app.type" />
                        </div>
                        <select onChange={this.collectionTypeOnChange} className="col-lg-5 tw-search">
                            <FormattedMessage id='app.all' >
                                {(message) => <option value='All'>{message}</option>}
                            </FormattedMessage>
                            {this.state.collectionType.map(el => <option key={el.apiID} value={el.apiID}>{el.displayName}</option>)}
                        </select>
                        <div >
                            <div className="col-lg-2 btn-search-container">
                                <button onClick={this.collectionTypeOnClick} className="btn btn-primary"><FormattedMessage id="app.search" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
