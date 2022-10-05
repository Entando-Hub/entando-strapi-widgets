import ReactDOM from "react-dom"
import React from "react"
import App from '../App'
import { checkIfUrlExists, getStrapiConfigurations } from "../api/Api";
import { STRAPI_BASE_URL_KEY } from "../helper/Constant";

const ATTRIBUTES = {
    selectedTemplateId: 'selectedTemplateId',
    selectedContentId: 'selectedContentId',
    selectedContentName: 'selectedContentName',
    selectedContentPluralName: 'selectedContentPluralName',
    selectedContentKind: 'selectedContentKind'
};
class SingleWidgetElement extends HTMLElement {

    static get observedAttributes() {
        return Object.values(ATTRIBUTES);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!Object.values(ATTRIBUTES).includes(name)) {
            throw new Error(`Untracked changed attribute: ${name}`);
        }
        if (this.mountPoint && newValue !== oldValue) {
            this.getStrapiConfiguration();
        }
    }

    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        this.getStrapiConfiguration();
    }

    render() {
        const templateId = this.getAttribute(ATTRIBUTES.selectedTemplateId);
        const contentId = this.getAttribute(ATTRIBUTES.selectedContentId);
        const contentName = this.getAttribute(ATTRIBUTES.selectedContentName);
        const contentPluralName = this.getAttribute(ATTRIBUTES.selectedContentPluralName);
        const contentKind = this.getAttribute(ATTRIBUTES.selectedContentKind);
        ReactDOM.render(
            <App templateId={templateId} contentId={contentId} contentName={contentName} contentPluralName={contentPluralName} contentKind={contentKind} />,
            this.mountPoint
        );
    }

    /**
     * Get strapi configurations
     */
    getStrapiConfiguration = async () => {
        localStorage.removeItem(STRAPI_BASE_URL_KEY);
        const { data, isError } = await getStrapiConfigurations();
        if (!isError && data && data.data && data.data.baseUrl) {
            const result = await checkIfUrlExists(data.data.baseUrl);
            if (result && result.data && result.data.status === 200 && !result.isError) {
                localStorage.setItem(STRAPI_BASE_URL_KEY, data.data.baseUrl);
            }
        }
        this.render();
    }
}

customElements.get('strapi-content-widget-app') || customElements.define('strapi-content-widget-app', SingleWidgetElement);

export default SingleWidgetElement;

