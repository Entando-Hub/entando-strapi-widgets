import React, { useEffect, useState } from 'react';
import { fetchStrapiBaseUrl, getContentById, getSingleTypeContent, getTemplateById } from './api/Api';
var velocityjs = require("velocityjs");
import './app.css';
import { STRAPI_BASE_URL_KEY } from './helper/Constant';
import StrapiConfigWarning from './page/StrapiConfigWarning';

function App({ contentName, contentPluralName, contentKind, templateId, contentId }) {
    const [templateData, setTemplateData] = useState(null);
    const [contentData, setContentData] = useState(null);
    const [htmlCode, setHtmlCode] = useState(null);

    useEffect(async () => {
        const getTemplate = await getTemplateById(templateId);
        let getContent;
        switch (contentKind) {
            case 'collectionType':
                getContent = await getContentById(contentPluralName, contentId);
                break;
            case 'singleType':
                getContent = await getSingleTypeContent(contentName);
                break;
        }        
        getContent = extractAttributes(getContent)
        const domain = await fetchStrapiBaseUrl();
        setTemplateData(getTemplate);
        setContentData(getContent)

        // VELOCITY START

        if (getContent && getTemplate) {
            Object.keys(getContent).length > 0 && Object.keys(getContent).map((key) => {
                if (getContent[key] && Array.isArray(getContent[key])) {
                    // For MultiMedia
                    if (getContent[key] && getContent[key][0] && getContent[key][0]['ext']) {
                        getContent[key].map(el => {
                            return el.url = domain + el.url
                        })
                    }
                } else if (getContent[key] && typeof getContent[key] === 'object') {
                    // For SingleMedia
                    if (getContent[key] && getContent[key]['ext']) {
                        if (typeof getContent[key] === 'object') {
                            getContent[key].url = domain + getContent[key].url
                        }
                    }
                }
            })
            const veloResult = velocityjs.render(getTemplate.contentShape, { content: getContent });
            setHtmlCode(veloResult);
        }
        // VELOCITY END

    }, [])
    if (localStorage.getItem(STRAPI_BASE_URL_KEY)) {
        return (
            <>
                {
                    htmlCode ?
                        <div dangerouslySetInnerHTML={{
                            __html: htmlCode
                        }}>
                        </div> : <h1>Loading...</h1>
                }
            </>
        );
    } else {
        return <StrapiConfigWarning />
    }
}

function extractAttributes(apiResponse) {
    const objectToRender = {};
    if (apiResponse.data && apiResponse.data.attributes) {
        const attributes = apiResponse.data.attributes;
        Object.entries(attributes).forEach(([key, value]) => {
            if (value && value.data && value.data.attributes) {
                value = extractAttributes(value)
            }
            objectToRender[key] = value
        });
    }
    return objectToRender
}

export default App;
