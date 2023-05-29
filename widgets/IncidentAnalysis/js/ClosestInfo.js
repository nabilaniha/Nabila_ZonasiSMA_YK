// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/_base/array dojo/dom-class dojo/dom-construct dojo/dom-style dojo/on esri/geometry/geometryEngine esri/graphic esri/layers/FeatureLayer esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/Font esri/symbols/TextSymbol esri/tasks/query jimu/utils".split(" "),function(B,p,w,t,k,q,C,u,x,y,D,z,A,E,F,G,H){return B("ClosestInfo",null,{constructor:function(a,d,b){this.tab=a;this.container=d;this.parent=b;this.graphicsLayer=
this.distance=this.incident=this.featureLayer=null;this.map=b.map;this.specialFields={}},updateForIncident:function(a,d,b){if(this.featureLayer)this.processIncident(a,d,b);else if(0<this.tab.tabLayers.length){var e=new D(this.tab.tabLayers[0].url);u(e,"load",p.hitch(this,function(){e.capabilities&&-1<e.capabilities.indexOf("Query")?(this.featureLayer=e,this.processIncident(a,d,b)):this._processError()}));u(this.parent.opLayers,"layerInfosFilterChanged",p.hitch(this,this._layerFilterChanged))}},_layerFilterChanged:function(a){if(null!==
this.featureLayer&&null!==this.incident&&null!==this.distance&&null!==this.graphicsLayer){var d=this.tab.tabLayers[0].id;t.forEach(a,p.hitch(this,function(b){d===b.id&&this.processIncident(this.incident,this.distance,this.graphicsLayer)}))}},processIncident:function(a,d,b){this.container.innerHTML="";k.add(this.container,"loading");var e=[];this.incident=a;this.distance=d;d=x.buffer(a.geometry,d,this.parent.config.distanceSettings[this.parent.config.distanceUnits]);this.graphicsLayer=b;this.graphicsLayer.clear();
var h=this.tab.tabLayers[0].id,f="";this.parent.opLayers.traversal(function(c){if(h===c.id&&c.getFilter())return f=c.getFilter(),!0});b=new G;b.returnGeometry=!0;b.geometry=d;b.where=f;b.outFields=this._getFields(this.featureLayer);b.outSpatialReference=this.parent.map.spatialReference;this.featureLayer.queryFeatures(b,p.hitch(this,function(c){var m=this._getFields(this.featureLayer);c=c.features;if(0<c.length){for(var l=0;l<c.length;l++){for(var g=c[l],r={DISTANCE:this._getDistance(a.geometry,g.geometry)},
n=0;n<m.length;n++)r[m[n]]=g.attributes[m[n]];g.attributes=r}c.sort(this._compareDistance);e.push(c[0])}this._processResults(e)}),p.hitch(this,this._processError))},_processError:function(){this.container.innerHTML="";k.remove(this.container,"loading");this.container.innerHTML=this.parent.nls.noFeaturesFound},_processResults:function(a){this.container.innerHTML="";k.remove(this.container,"loading");0===a.length&&(this.container.innerHTML=this.parent.nls.noFeaturesFound);var d=q.create("div",{id:"tpc",
style:"width:"+220*a.length+"px;"},this.container);k.add(d,"IMT_tabPanelContent");for(var b=this.parent.nls[this.parent.config.distanceUnits],e=0;e<a.length;e++){var h=e+1,f=a[e],c=f.geometry,m=c;"point"!==c.type&&(m=c.getExtent().getCenter());f=f.attributes;var l=b+": "+Math.round(100*f.DISTANCE)/100;c="";var g=0,r;for(r in f)"DISTANCE"!==r&&3>g&&(c+=this._getFieldValue(r,f[r])+"\x3cbr/\x3e",g+=1);g=q.create("div",{id:"Feature_"+h},d);k.add(g,"IMTcolRec");var n=q.create("div",{},g);k.add(n,"IMTcolRecBar");
var v=q.create("div",{innerHTML:h},n);k.add(v,"IMTcolRecNum");C.set(v,"backgroundColor",this.parent.config.color);u(v,"click",p.hitch(this,this._zoomToLocation,m));l=q.create("div",{innerHTML:l},n);k.add(l,"IMTcolDistance");this.parent.config.enableRouting&&(l=q.create("div",{},n),k.add(l,"IMTcolDir"),u(l,"click",p.hitch(this,this._routeToIncident,m)));c=q.create("div",{innerHTML:H.sanitizeHTML(c?c:"")},g);k.add(c,"IMTcolInfo");c=new A(A.STYLE_SOLID,new w.fromString(this.parent.config.color),1);c=
new z(z.STYLE_CIRCLE,24,c,new w.fromString(this.parent.config.color));g=new E;g.family="Arial";g.size="12px";h=new F(h,g,"#ffffff");h.setOffset(0,-4);this.graphicsLayer.add(new y(m,c,f));this.graphicsLayer.add(new y(m,h,f))}},_getFields:function(a){var d=[];if(this.tab.advConfig&&this.tab.advConfig.fields&&0<this.tab.advConfig.fields.length)t.forEach(this.tab.advConfig.fields,function(c){d.push(c.expression)});else{var b=a.infoTemplate?a.infoTemplate.info.fieldInfos:a.fields;for(var e=0;e<b.length;e++){var h=
b[e];"undefined"!==typeof h.visible?h.visible&&d.push(h.fieldName):d.push(h.name)}}var f={};t.forEach(a.fields,function(c){if("esriFieldTypeDate"===c.type||c.domain)f[c.name]=c});this.specialFields=f;return d},_getFieldValue:function(a,d){var b=d;this.specialFields[a]&&(a=this.specialFields[a],"esriFieldTypeDate"===a.type?b=(new Date(d)).toLocaleString():t.some(a.domain.codedValues,function(e){if(e.code===d)return b=e.name,!0}));return b},_getDistance:function(a,d){var b=0,e=this.parent.config.distanceUnits;
b=x.distance(a,d,9001);switch(e){case "miles":b*=6.21371E-4;break;case "kilometers":b*=.001;break;case "feet":b*=3.28084;break;case "yards":b*=1.09361;break;case "nauticalMiles":b*=5.39957E-4}return b},_compareDistance:function(a,d){return a.attributes.DISTANCE<d.attributes.DISTANCE?-1:a.attributes.DISTANCE>d.attributes.DISTANCE?1:0},_zoomToLocation:function(a){this.parent.zoomToLocation(a)},_routeToIncident:function(a){this.parent.routeToIncident(a)}})});