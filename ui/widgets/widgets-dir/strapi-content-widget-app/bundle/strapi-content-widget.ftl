<#assign wp=JspTaglibs["/aps-core"]>
<#-- entando_resource_injection_point -->
<#-- Don't add anything above this line. The build scripts will automatically link the compiled JS and CSS for you and add them above this line so that the widget can be loaded-->

<@wp.currentWidget param="config" configParam="selectedTemplateId" var="configSelectedTemplateId" />
<@wp.currentWidget param="config" configParam="selectedContentId" var="configSelectedContentId" />
<@wp.currentWidget param="config" configParam="selectedContentName" var="configSelectedContentName" />
<@wp.currentWidget param="config" configParam="selectedContentPluralName" var="configSelectedContentPluralName" />
<@wp.currentWidget param="config" configParam="selectedContentKind" var="configSelectedContentKind" />
<strapi-content-widget-app selectedContentName="${configSelectedContentName}" selectedTemplateId="${configSelectedTemplateId}" selectedContentId=${configSelectedContentId} selectedContentPluralName="${configSelectedContentPluralName}" selectedContentKind="${configSelectedContentKind}" />
