<#assign wp=JspTaglibs["/aps-core"]>
<#-- entando_resource_injection_point -->
<#-- Don't add anything above this line. The build scripts will automatically link the compiled JS and CSS for you and add them above this line so that the widget can be loaded-->

<@wp.currentWidget param="config" configParam="selectedContentName" var="configSelectedContentName" />
<@wp.currentWidget param="config" configParam="selectedContentPluralName" var="configSelectedContentPluralName" />
<@wp.currentWidget param="config" configParam="selectedContentKind" var="configSelectedContentKind" />
<@wp.currentWidget param="config" configParam="contentIdAndTemplateId" var="configContentIdAndTemplateId" />
<@wp.currentWidget param="config" configParam="saveQuery" var="configSaveQuery" />
<@wp.currentWidget param="config" configParam="colLabel" var="configColLabel" />
<strapi-content-list-widget-app contentName="${configSelectedContentName}" contentPluralName="${configSelectedContentPluralName}" contentKind="${configSelectedContentKind}" contentIdsAndTemplateIds="${configContentIdAndTemplateId}" colLabelName="${configColLabel}" saveQueryDetails="${configSaveQuery}" />
