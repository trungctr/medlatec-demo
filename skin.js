// Garden Gnome Software - Skin
// Pano2VR 6.1.12/18076
// Filename: Skin-MEDLATEC-HaNoi-ver3.ggsk
// Generated 2022-11-29T11:07:29
const UI_text = {
	english: true,
	title: "",
	VN: {
		title: "Khoa x\xe9t nghi\u1ec7m MEDLATEC",
		manual1:"thay đổi góc nhìn",
		manual2:"Ph\xf3ng to - Thu nh\u1ecf",//phóng to thu nhỏ
		manual3:"Click \u0111\u1ec3 b\u1eaft \u0111\u1ea7u tham quan",
		play_back:"quay lại",
		play_next:"kế tiếp",
		tips1:"Di chu\u1ed9t \u0111\u1ec3 hi\u1ec3n th\u1ecb<br\/>danh s\xe1ch c\xe1c v\u1ecb tr\xed",
	},
	EN: {
		title: "MEDLATEC Laboratory Center",
		manual1:"Change the vision",
		manual2:"Zoom in - Zoom out",
		manual3:"click to start",
		play_back:"previous",
		play_next:"next",
		tips1:"Mouse over here<br\/>to show the areas list",
	},
}
function pano2vrSkin(player,base) {
	player.addVariable('tran_en', 2, UI_text.english);
	player.addVariable('sound_on', 2, true);
	player.addVariable('information', 2, false);
	player.addVariable('show_menu_thumb', 2, false);
	player.addVariable('map_hide', 2, false);
	player.addVariable('map_scale_normal', 2, false);
	player.addVariable('map_scale_full', 2, false);
	player.addVariable('map_sel', 1, 0);
	player.addVariable('ht_colour', 1, 0);
	player.addVariable('ht_data_nodeid', 0, "");
	player.addVariable('ht_data_target', 0, "");
	player.addVariable('gallery_full', 1, 0);
	player.addVariable('gallery_border', 1, 0);
	player.addVariable('open_popup', 2, false);
	player.addVariable('open_video', 2, false);
	player.addVariable('tooltip_hover', 2, false);
	player.addVariable('show_remote', 2, false);
	player.addVariable('3D_space_open', 2, false);
	player.addVariable('var_hs', 1, 0);
	player.addVariable('hs_info', 2, false);
	player.addVariable('hs_info_c', 2, false);
	player.addVariable('map_4d', 2, false);
	player.addVariable('var_intro_logo', 2, false);
	player.addVariable('hide_callout', 2, false);
	player.addVariable('callout_gallery', 2, false);
	player.addVariable('sel_map', 1, 0);
	player.addVariable('var_scale_logo', 2, false);
	player.addVariable('var_intro', 2, true);
	player.addVariable('play_nextnode', 2, true);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._hs_timer=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=250;
		el.ggId="hs_timer";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_timer.ggIsActive=function() {
			return (me._hs_timer.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._hs_timer.ggTimestamp) / me._hs_timer.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hs_timer.ggActivate=function () {
			player.setVariableValue('var_hs', player.getVariableValue('var_hs') + Number("1"));
			player.setVariableValue('var_hs', player.getVariableValue('var_hs') % Number("4"));
		}
		me._hs_timer.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._hs_timer);
		el=me._timer_hs_fun=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=2000;
		el.ggId="Timer_hs_fun";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_hs_fun.ggIsActive=function() {
			return (me._timer_hs_fun.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._timer_hs_fun.ggTimestamp) / me._timer_hs_fun.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_hs_fun.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_hs_fun.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_hs_fun.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_hs_fun.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_hs_fun.style[domTransition]='';
				if (me._timer_hs_fun.ggCurrentLogicStateVisible == 0) {
					me._timer_hs_fun.style.visibility="hidden";
					me._timer_hs_fun.ggVisible=false;
				}
				else {
					me._timer_hs_fun.style.visibility=(Number(me._timer_hs_fun.style.opacity)>0||!me._timer_hs_fun.style.opacity)?'inherit':'hidden';
					me._timer_hs_fun.ggVisible=true;
				}
			}
		}
		me._timer_hs_fun.ggActivate=function () {
			player.setVariableValue('ht_colour', player.getVariableValue('ht_colour') + Number("1"));
			player.setVariableValue('ht_colour', player.getVariableValue('ht_colour') % Number("3"));
		}
		me._timer_hs_fun.ggCurrentLogicStateVisible = -1;
		me._timer_hs_fun.ggUpdateConditionTimer=function () {
			me._timer_hs_fun.logicBlock_visible();
		}
		me._timer_hs_fun.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_hs_fun);
		el=me._powered_by=document.createElement('div');
		els=me._powered_by__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._powered_by__img.setAttribute('src',basePath + 'images/powered_by.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="powered_by";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 10px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 160px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 100%';
		me._powered_by.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._powered_by.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._powered_by.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._powered_by.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._powered_by.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 200ms ease 0ms';
				if (me._powered_by.ggCurrentLogicStateScaling == 0) {
					me._powered_by.ggParameter.sx = 0.7;
					me._powered_by.ggParameter.sy = 0.7;
					me._powered_by.style[domTransform]=parameterToTransform(me._powered_by.ggParameter);
				}
				else {
					me._powered_by.ggParameter.sx = 1;
					me._powered_by.ggParameter.sy = 1;
					me._powered_by.style[domTransform]=parameterToTransform(me._powered_by.ggParameter);
				}
			}
		}
		me._powered_by.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._powered_by.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._powered_by.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._powered_by.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 200ms ease 0ms';
				if (me._powered_by.ggCurrentLogicStateVisible == 0) {
					me._powered_by.style.visibility="hidden";
					me._powered_by.ggVisible=false;
				}
				else {
					me._powered_by.style.visibility=(Number(me._powered_by.style.opacity)>0||!me._powered_by.style.opacity)?'inherit':'hidden';
					me._powered_by.ggVisible=true;
				}
			}
		}
		me._powered_by.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['powered_by'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._powered_by.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._powered_by.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._powered_by.style[domTransition]='' + cssPrefix + 'transform 0s, opacity 200ms ease 0ms';
				if (me._powered_by.ggCurrentLogicStateAlpha == 0) {
					me._powered_by.style.visibility=me._powered_by.ggVisible?'inherit':'hidden';
					me._powered_by.style.opacity=1;
				}
				else {
					me._powered_by.style.visibility=me._powered_by.ggVisible?'inherit':'hidden';
					me._powered_by.style.opacity=0.5;
				}
			}
		}
		me._powered_by.onclick=function (e) {
			player.openUrl("https:\/\/trungctr.com","_blank");
		}
		me._powered_by.onmouseover=function (e) {
			me.elementMouseOver['powered_by']=true;
			me._powered_by.logicBlock_alpha();
		}
		me._powered_by.onmouseout=function (e) {
			me.elementMouseOver['powered_by']=false;
			me._powered_by.logicBlock_alpha();
		}
		me._powered_by.ontouchend=function (e) {
			me.elementMouseOver['powered_by']=false;
			me._powered_by.logicBlock_alpha();
		}
		me._powered_by.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._powered_by);
		el=me._remote_container=document.createElement('div');
		el.ggId="remote_container";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 5px;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 100%';
		me._remote_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._remote_container.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._remote_container.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._remote_container.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._remote_container.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._remote_container.ggCurrentLogicStateScaling == 0) {
					me._remote_container.ggParameter.sx = 0.8;
					me._remote_container.ggParameter.sy = 0.8;
					me._remote_container.style[domTransform]=parameterToTransform(me._remote_container.ggParameter);
				}
				else {
					me._remote_container.ggParameter.sx = 1;
					me._remote_container.ggParameter.sy = 1;
					me._remote_container.style[domTransform]=parameterToTransform(me._remote_container.ggParameter);
				}
			}
		}
		me._remote_container.ggUpdatePosition=function (useTransition) {
		}
		el=me._info_pad=document.createElement('div');
		el.ggId="info_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : rgba(255,255,255,0);';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 90px;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_pad.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info_pad.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info_pad.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._info_pad.ggCurrentLogicStatePosition == 0) {
					me._info_pad.style.right='0px';
					me._info_pad.style.bottom='180px';
				}
				else {
					me._info_pad.style.right='90px';
					me._info_pad.style.bottom='0px';
				}
			}
		}
		me._info_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._info_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._info_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._info_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._info_pad.ggCurrentLogicStateVisible == 0) {
					me._info_pad.style.visibility="hidden";
					me._info_pad.ggVisible=false;
				}
				else {
					me._info_pad.style.visibility=(Number(me._info_pad.style.opacity)>0||!me._info_pad.style.opacity)?'inherit':'hidden';
					me._info_pad.ggVisible=true;
				}
			}
		}
		me._info_pad.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['info_pad'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._info_pad.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._info_pad.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._info_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._info_pad.ggCurrentLogicStateBackgroundColor == 0) {
					me._info_pad.style.backgroundColor="rgba(40,40,40,1)";
				}
				else {
					me._info_pad.style.backgroundColor="rgba(255,255,255,0)";
				}
			}
		}
		me._info_pad.onclick=function (e) {
			player.setVariableValue('hs_info_c', true);
			if (player.transitionsDisabled) {
				me._container_info_c.style[domTransition]='none';
			} else {
				me._container_info_c.style[domTransition]='all 700ms ease-out 0ms';
			}
			me._container_info_c.ggParameter.sx=1;me._container_info_c.ggParameter.sy=1;
			me._container_info_c.style[domTransform]=parameterToTransform(me._container_info_c.ggParameter);
			me._info_image_c.ggText=basePath + me.ggUserdata.copyright;
			me._info_image_c.ggSubElement.style.width = '0px';
			me._info_image_c.ggSubElement.style.height = '0px';
			me._info_image_c.ggSubElement.src='';
			me._info_image_c.ggSubElement.src=me._info_image_c.ggText;
			me._text_info_c.ggText=me.ggUserdata.information;
			me._text_info_c.ggTextDiv.innerHTML=me._text_info_c.ggText;
			if (me._text_info_c.ggUpdateText) {
				me._text_info_c.ggUpdateText=function() {
					var hs=me.ggUserdata.information;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info_c.ggUpdatePosition) {
				me._text_info_c.ggUpdatePosition();
			}
			me._text_info_c.ggTextDiv.scrollTop = 0;
		}
		me._info_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Th\xf4ng tin";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Th\xf4ng tin";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Infomation";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Infomation";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			me.elementMouseOver['info_pad']=true;
			me._info_pad.logicBlock_backgroundcolor();
		}
		me._info_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['info_pad']=false;
			me._info_pad.logicBlock_backgroundcolor();
		}
		me._info_pad.ontouchend=function (e) {
			me.elementMouseOver['info_pad']=false;
			me._info_pad.logicBlock_backgroundcolor();
		}
		me._info_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._infoico=document.createElement('div');
		els=me._infoico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._infoico__img.setAttribute('src',basePath + 'images/infoico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="info-ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 24px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._infoico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._infoico.onclick=function (e) {
			me._text_info_c2.ggText="<iframe src=\"https:\/\/drive.google.com\/file\/d\/1gmXWc59WxQMzsx0Rv_DA6SKeLzTCtWNx\/preview\" width=\"100%\" height=\"100%\" allow=\"autoplay\"><\/iframe>";
			me._text_info_c2.ggTextDiv.innerHTML=me._text_info_c2.ggText;
			if (me._text_info_c2.ggUpdateText) {
				me._text_info_c2.ggUpdateText=function() {
					var hs="<iframe src=\"https:\/\/drive.google.com\/file\/d\/1gmXWc59WxQMzsx0Rv_DA6SKeLzTCtWNx\/preview\" width=\"100%\" height=\"100%\" allow=\"autoplay\"><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info_c2.ggUpdatePosition) {
				me._text_info_c2.ggUpdatePosition();
			}
			me._text_info_c2.ggTextDiv.scrollTop = 0;
		}
		me._infoico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._info_pad.appendChild(me._infoico);
		me._remote_container.appendChild(me._info_pad);
		el=me._volume_pad=document.createElement('div');
		el.ggId="Volume_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : rgba(20,20,20,0);';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 45px;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_pad.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._volume_pad.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._volume_pad.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._volume_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, ' + cssPrefix + 'transform 200ms ease 0ms, background-color 200ms ease 0ms';
				if (me._volume_pad.ggCurrentLogicStatePosition == 0) {
					me._volume_pad.style.right='0px';
					me._volume_pad.style.bottom='135px';
				}
				else {
					me._volume_pad.style.right='45px';
					me._volume_pad.style.bottom='0px';
				}
			}
		}
		me._volume_pad.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['volume_pad'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._volume_pad.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._volume_pad.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._volume_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, ' + cssPrefix + 'transform 200ms ease 0ms, background-color 200ms ease 0ms';
				if (me._volume_pad.ggCurrentLogicStateScaling == 0) {
					me._volume_pad.ggParameter.sx = 1.1;
					me._volume_pad.ggParameter.sy = 1.1;
					me._volume_pad.style[domTransform]=parameterToTransform(me._volume_pad.ggParameter);
				}
				else {
					me._volume_pad.ggParameter.sx = 1;
					me._volume_pad.ggParameter.sy = 1;
					me._volume_pad.style[domTransform]=parameterToTransform(me._volume_pad.ggParameter);
				}
			}
		}
		me._volume_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true)) && 
				((player.getVariableValue('show_remote') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._volume_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._volume_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._volume_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, ' + cssPrefix + 'transform 200ms ease 0ms, background-color 200ms ease 0ms';
				if (me._volume_pad.ggCurrentLogicStateVisible == 0) {
					me._volume_pad.style.visibility="hidden";
					me._volume_pad.ggVisible=false;
				}
				else {
					me._volume_pad.style.visibility=(Number(me._volume_pad.style.opacity)>0||!me._volume_pad.style.opacity)?'inherit':'hidden';
					me._volume_pad.ggVisible=true;
				}
			}
		}
		me._volume_pad.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['volume_pad'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._volume_pad.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._volume_pad.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._volume_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, ' + cssPrefix + 'transform 200ms ease 0ms, background-color 200ms ease 0ms';
				if (me._volume_pad.ggCurrentLogicStateBackgroundColor == 0) {
					me._volume_pad.style.backgroundColor="rgba(40,40,40,1)";
				}
				else {
					me._volume_pad.style.backgroundColor="rgba(20,20,20,0)";
				}
			}
		}
		me._volume_pad.onclick=function (e) {
			player.setVariableValue('sound_on', !player.getVariableValue('sound_on'));
			if (
				(
					((player.getVariableValue('information') == false)) && 
					((player.getVariableValue('sound_on') == false)) && 
					((player.getIsMobile() == false))
				)
			) {
				player.setVariableValue('information', false);
			}
		}
		me._volume_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', !player.getVariableValue('tooltip_hover'));
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="B\u1eadt\/T\u1eaft \xe2m thanh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="B\u1eadt\/T\u1eaft \xe2m thanh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Sound On\/Off";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Sound On\/Off";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			me.elementMouseOver['volume_pad']=true;
			me._volume_pad.logicBlock_scaling();
			me._volume_pad.logicBlock_backgroundcolor();
		}
		me._volume_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['volume_pad']=false;
			me._volume_pad.logicBlock_scaling();
			me._volume_pad.logicBlock_backgroundcolor();
		}
		me._volume_pad.ontouchend=function (e) {
			me.elementMouseOver['volume_pad']=false;
			me._volume_pad.logicBlock_scaling();
			me._volume_pad.logicBlock_backgroundcolor();
		}
		me._volume_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._volume_on_ico=document.createElement('div');
		els=me._volume_on_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._volume_on_ico__img.setAttribute('src',basePath + 'images/volume_on_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Volume_on_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 22px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_on_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_on_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('sound_on') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._volume_on_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._volume_on_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._volume_on_ico.style[domTransition]='';
				if (me._volume_on_ico.ggCurrentLogicStateVisible == 0) {
					me._volume_on_ico.style.visibility=(Number(me._volume_on_ico.style.opacity)>0||!me._volume_on_ico.style.opacity)?'inherit':'hidden';
					me._volume_on_ico.ggVisible=true;
				}
				else {
					me._volume_on_ico.style.visibility="hidden";
					me._volume_on_ico.ggVisible=false;
				}
			}
		}
		me._volume_on_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._volume_pad.appendChild(me._volume_on_ico);
		el=me._volume_off_ico=document.createElement('div');
		els=me._volume_off_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._volume_off_ico__img.setAttribute('src',basePath + 'images/volume_off_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Volume_off_ico";
		el.ggDx=0;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 22px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._volume_off_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._volume_off_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('sound_on') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._volume_off_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._volume_off_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._volume_off_ico.style[domTransition]='';
				if (me._volume_off_ico.ggCurrentLogicStateVisible == 0) {
					me._volume_off_ico.style.visibility=(Number(me._volume_off_ico.style.opacity)>0||!me._volume_off_ico.style.opacity)?'inherit':'hidden';
					me._volume_off_ico.ggVisible=true;
				}
				else {
					me._volume_off_ico.style.visibility="hidden";
					me._volume_off_ico.ggVisible=false;
				}
			}
		}
		me._volume_off_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._volume_pad.appendChild(me._volume_off_ico);
		me._remote_container.appendChild(me._volume_pad);
		el=me._language_pad=document.createElement('div');
		el.ggId="Language_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : rgba(255,255,255,0);';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 90px;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._language_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._language_pad.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._language_pad.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._language_pad.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._language_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._language_pad.ggCurrentLogicStatePosition == 0) {
					me._language_pad.style.right='0px';
					me._language_pad.style.bottom='180px';
				}
				else {
					me._language_pad.style.right='90px';
					me._language_pad.style.bottom='0px';
				}
			}
		}
		me._language_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true)) && 
				((player.getVariableValue('show_remote') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._language_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._language_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._language_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._language_pad.ggCurrentLogicStateVisible == 0) {
					me._language_pad.style.visibility="hidden";
					me._language_pad.ggVisible=false;
				}
				else {
					me._language_pad.style.visibility="hidden";
					me._language_pad.ggVisible=false;
				}
			}
		}
		me._language_pad.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['language_pad'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._language_pad.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._language_pad.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._language_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._language_pad.ggCurrentLogicStateBackgroundColor == 0) {
					me._language_pad.style.backgroundColor="rgba(40,40,40,1)";
				}
				else {
					me._language_pad.style.backgroundColor="rgba(255,255,255,0)";
				}
			}
		}
		me._language_pad.onclick=function (e) {
			player.setVariableValue('tran_en', !player.getVariableValue('tran_en'));
		}
		me._language_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Ng\xf4n ng\u1eef";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Ng\xf4n ng\u1eef";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Language";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Language";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			me.elementMouseOver['language_pad']=true;
			me._language_pad.logicBlock_backgroundcolor();
		}
		me._language_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['language_pad']=false;
			me._language_pad.logicBlock_backgroundcolor();
		}
		me._language_pad.ontouchend=function (e) {
			me.elementMouseOver['language_pad']=false;
			me._language_pad.logicBlock_backgroundcolor();
		}
		me._language_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._vi_lang=document.createElement('div');
		els=me._vi_lang__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._vi_lang__img.setAttribute('src',basePath + 'images/vi_lang.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="vi_lang";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vi_lang.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vi_lang.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('tran_en') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vi_lang.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vi_lang.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._vi_lang.style[domTransition]='';
				if (me._vi_lang.ggCurrentLogicStateVisible == 0) {
					me._vi_lang.style.visibility=(Number(me._vi_lang.style.opacity)>0||!me._vi_lang.style.opacity)?'inherit':'hidden';
					me._vi_lang.ggVisible=true;
				}
				else {
					me._vi_lang.style.visibility="hidden";
					me._vi_lang.ggVisible=false;
				}
			}
		}
		me._vi_lang.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._language_pad.appendChild(me._vi_lang);
		el=me._en_lang=document.createElement('div');
		els=me._en_lang__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._en_lang__img.setAttribute('src',basePath + 'images/en_lang.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="en_lang";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._en_lang.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._en_lang.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('tran_en') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._en_lang.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._en_lang.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._en_lang.style[domTransition]='';
				if (me._en_lang.ggCurrentLogicStateVisible == 0) {
					me._en_lang.style.visibility=(Number(me._en_lang.style.opacity)>0||!me._en_lang.style.opacity)?'inherit':'hidden';
					me._en_lang.ggVisible=true;
				}
				else {
					me._en_lang.style.visibility="hidden";
					me._en_lang.ggVisible=false;
				}
			}
		}
		me._en_lang.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._language_pad.appendChild(me._en_lang);
		me._remote_container.appendChild(me._language_pad);
		el=me._share_pad=document.createElement('div');
		el.ggId="Share_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : rgba(255,255,255,0);';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 45px;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._share_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._share_pad.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._share_pad.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._share_pad.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._share_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._share_pad.ggCurrentLogicStatePosition == 0) {
					me._share_pad.style.right='0px';
					me._share_pad.style.bottom='135px';
				}
				else {
					me._share_pad.style.right='45px';
					me._share_pad.style.bottom='0px';
				}
			}
		}
		me._share_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true)) && 
				((player.getVariableValue('show_remote') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._share_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._share_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._share_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._share_pad.ggCurrentLogicStateVisible == 0) {
					me._share_pad.style.visibility="hidden";
					me._share_pad.ggVisible=false;
				}
				else {
					me._share_pad.style.visibility="hidden";
					me._share_pad.ggVisible=false;
				}
			}
		}
		me._share_pad.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['share_pad'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._share_pad.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._share_pad.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._share_pad.style[domTransition]='right 500ms ease 0ms, bottom 500ms ease 0ms, background-color 200ms ease 0ms';
				if (me._share_pad.ggCurrentLogicStateBackgroundColor == 0) {
					me._share_pad.style.backgroundColor="rgba(40,40,40,1)";
				}
				else {
					me._share_pad.style.backgroundColor="rgba(255,255,255,0)";
				}
			}
		}
		me._share_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Chia s\u1ebb";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Chia s\u1ebb";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Share";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Share";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			me.elementMouseOver['share_pad']=true;
			me._share_pad.logicBlock_backgroundcolor();
		}
		me._share_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			me.elementMouseOver['share_pad']=false;
			me._share_pad.logicBlock_backgroundcolor();
		}
		me._share_pad.ontouchend=function (e) {
			me.elementMouseOver['share_pad']=false;
			me._share_pad.logicBlock_backgroundcolor();
		}
		me._share_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._share_ico=document.createElement('div');
		els=me._share_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._share_ico__img.setAttribute('src',basePath + 'images/share_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="share_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 22px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._share_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._share_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._share_pad.appendChild(me._share_ico);
		me._remote_container.appendChild(me._share_pad);
		el=me._vr_pad=document.createElement('div');
		el.ggId="vr_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 90px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vr_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vr_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('show_remote') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vr_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vr_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._vr_pad.style[domTransition]='';
				if (me._vr_pad.ggCurrentLogicStateVisible == 0) {
					me._vr_pad.style.visibility=(Number(me._vr_pad.style.opacity)>0||!me._vr_pad.style.opacity)?'inherit':'hidden';
					me._vr_pad.ggVisible=true;
				}
				else {
					me._vr_pad.style.visibility="hidden";
					me._vr_pad.ggVisible=false;
				}
			}
		}
		me._vr_pad.onclick=function (e) {
			player.enterVR();
		}
		me._vr_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=-20;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="M\u1edf khi d\xf9ng k\xednh VR";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="M\u1edf khi d\xf9ng k\xednh VR";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Open when using Vr";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Open when using Vr";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._vr_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=0;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
		}
		me._vr_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._vr_ico=document.createElement('div');
		els=me._vr_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._vr_ico__img.setAttribute('src',basePath + 'images/vr_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="vr_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._vr_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._vr_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._vr_pad.appendChild(me._vr_ico);
		me._remote_container.appendChild(me._vr_pad);
		el=me._zoom_pad=document.createElement('div');
		el.ggId="zoom_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 45px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoom_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_pad.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('show_remote') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoom_pad.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoom_pad.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoom_pad.style[domTransition]='';
				if (me._zoom_pad.ggCurrentLogicStateVisible == 0) {
					me._zoom_pad.style.visibility=(Number(me._zoom_pad.style.opacity)>0||!me._zoom_pad.style.opacity)?'inherit':'hidden';
					me._zoom_pad.ggVisible=true;
				}
				else {
					me._zoom_pad.style.visibility="hidden";
					me._zoom_pad.ggVisible=false;
				}
			}
		}
		me._zoom_pad.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._zoom_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._zoom_in_ico=document.createElement('div');
		els=me._zoom_in_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._zoom_in_ico__img.setAttribute('src',basePath + 'images/zoom_in_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="zoom_in_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoom_in_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_in_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoom_in_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoom_in_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoom_in_ico.style[domTransition]='';
				if (me._zoom_in_ico.ggCurrentLogicStateVisible == 0) {
					me._zoom_in_ico.style.visibility=(Number(me._zoom_in_ico.style.opacity)>0||!me._zoom_in_ico.style.opacity)?'inherit':'hidden';
					me._zoom_in_ico.ggVisible=true;
				}
				else {
					me._zoom_in_ico.style.visibility="hidden";
					me._zoom_in_ico.ggVisible=false;
				}
			}
		}
		me._zoom_in_ico.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=-20;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="To\xe0n m\xe0n h\xecnh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="To\xe0n m\xe0n h\xecnh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Full screen";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Full screen";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._zoom_in_ico.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=0;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
		}
		me._zoom_in_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._zoom_pad.appendChild(me._zoom_in_ico);
		el=me._zoom_out_ico=document.createElement('div');
		els=me._zoom_out_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._zoom_out_ico__img.setAttribute('src',basePath + 'images/zoom_out_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="zoom_out_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoom_out_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_out_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._zoom_out_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._zoom_out_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._zoom_out_ico.style[domTransition]='';
				if (me._zoom_out_ico.ggCurrentLogicStateVisible == 0) {
					me._zoom_out_ico.style.visibility=(Number(me._zoom_out_ico.style.opacity)>0||!me._zoom_out_ico.style.opacity)?'inherit':'hidden';
					me._zoom_out_ico.ggVisible=true;
				}
				else {
					me._zoom_out_ico.style.visibility="hidden";
					me._zoom_out_ico.ggVisible=false;
				}
			}
		}
		me._zoom_out_ico.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=-20;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Tho\xe1t to\xe0n m\xe0n h\xecnh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Tho\xe1t to\xe0n m\xe0n h\xecnh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Full screen exit";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Full screen exit";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._zoom_out_ico.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=0;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
		}
		me._zoom_out_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._zoom_pad.appendChild(me._zoom_out_ico);
		me._remote_container.appendChild(me._zoom_pad);
		el=me._setting_pad=document.createElement('div');
		el.ggId="setting_pad";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 44px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 44px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._setting_pad.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._setting_pad.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['setting_pad'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._setting_pad.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._setting_pad.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._setting_pad.style[domTransition]='background-color 200ms ease 0ms';
				if (me._setting_pad.ggCurrentLogicStateBackgroundColor == 0) {
					me._setting_pad.style.backgroundColor="rgba(0,0,0,1)";
				}
				else {
					me._setting_pad.style.backgroundColor="rgba(40,40,40,1)";
				}
			}
		}
		me._setting_pad.onclick=function (e) {
			player.setVariableValue('show_remote', !player.getVariableValue('show_remote'));
		}
		me._setting_pad.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=-20;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="N\xe2ng cao";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="N\xe2ng cao";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Advance";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Advance";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			me.elementMouseOver['setting_pad']=true;
			me._setting_pad.logicBlock_backgroundcolor();
		}
		me._setting_pad.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			if (player.transitionsDisabled) {
				me._tooltip.style[domTransition]='none';
			} else {
				me._tooltip.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._tooltip.ggParameter.rx=0;me._tooltip.ggParameter.ry=0;
			me._tooltip.style[domTransform]=parameterToTransform(me._tooltip.ggParameter);
			me.elementMouseOver['setting_pad']=false;
			me._setting_pad.logicBlock_backgroundcolor();
		}
		me._setting_pad.ontouchend=function (e) {
			me.elementMouseOver['setting_pad']=false;
			me._setting_pad.logicBlock_backgroundcolor();
		}
		me._setting_pad.ggUpdatePosition=function (useTransition) {
		}
		el=me._setting_ico=document.createElement('div');
		els=me._setting_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._setting_ico__img.setAttribute('src',basePath + 'images/setting_ico.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="setting_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._setting_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._setting_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._setting_pad.appendChild(me._setting_ico);
		me._remote_container.appendChild(me._setting_pad);
		el=me._video_ico=document.createElement('div');
		els=me._video_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik0zMC43LDE0LjNhNC40LDQuNCwwLDAsMC00LjcsMCw0LjcsNC43LDAsMCwwLTIuNCw0LjFWMzAuNkE0LjgsNC44LDAsMCwwLDI2LDM0LjhhNC42LDQuNiwwLDAsMCwyLjMuNiw0LjgsNC44LDAsMCwwLDIuNC0uNmwxMC41LTYuMWE0LjgsNC44LDAsMCwwLDAtOC4zWk0yOC41LDMwLjRWMTguNmwxMC4xLDUuOVptMjkuOS00LjJWMTAuNWE0LjksNC45LDAsMC'+
			'wwLTQuOS00LjloLTQzYTQuOSw0LjksMCwwLDAtNC45LDQuOVYzOC42YTQuOSw0LjksMCwwLDAsNC45LDQuOWg0M2E0LjksNC45LDAsMCwwLDQuOS00LjksMi41LDIuNSwwLDAsMSw0LjksMCw5LjgsOS44LDAsMCwxLTkuOCw5LjhoLTQzQTkuOCw5LjgsMCwwLDEsLjcsMzguNlYxMC41QTkuOCw5LjgsMCwwLDEsMTAuNS43aDQzYTkuOCw5LjgsMCwwLDEsOS44LDkuOFYyNi4yYTIuNSwyLjUsMCwxLDEtNC45LDBabTQuOSwzMi4xYTIuNSwyLjUsMCwwLDEtMi40LDIuNUgyOS40YTIuNSwyLjUsMCwwLDEsMC00LjlINjAuOUEyLjQsMi40LDAsMCwxLDYzLjMsNTguM1ptLTQxLjIuMWE0LjksNC45LDAs'+
			'MCwxLTQuOSw0LjksNC44LDQuOCwwLDAsMS00LjMtMi41SDMuMWEyLjUsMi41LDAsMCwxLDAtNC45SDEzYTUsNSwwLDAsMSw0LjItMi40QTQuOSw0LjksMCwwLDEsMjIuMSw1OC40WiIvPgo8L3N2Zz4K';
		me._video_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="video_ico";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 28px;';
		hs+='position : absolute;';
		hs+='right : 140px;';
		hs+='visibility : inherit;';
		hs+='width : 28px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._video_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._video_ico.style[domTransition]='';
				if (me._video_ico.ggCurrentLogicStateVisible == 0) {
					me._video_ico.style.visibility="hidden";
					me._video_ico.ggVisible=false;
				}
				else {
					me._video_ico.style.visibility=(Number(me._video_ico.style.opacity)>0||!me._video_ico.style.opacity)?'inherit':'hidden';
					me._video_ico.ggVisible=true;
				}
			}
		}
		me._video_ico.onclick=function (e) {
			player.setVariableValue('open_video', true);
			if (player.transitionsDisabled) {
				me._popup_video.style[domTransition]='none';
			} else {
				me._popup_video.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup_video.ggParameter.sx=1;me._popup_video.ggParameter.sy=1;
			me._popup_video.style[domTransform]=parameterToTransform(me._popup_video.ggParameter);
			me._video_ytb.ggInitMedia("kLknzT-UUbY");
				player.pauseSound("_background");
				player.pauseSound("Element01");
		}
		me._video_ico.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="M\u1edf Video";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="M\u1edf Video";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Open Video";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Open Video";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._video_ico.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
		}
		me._video_ico.ggUpdatePosition=function (useTransition) {
		}
		me._remote_container.appendChild(me._video_ico);
		el=me._gallery_ico=document.createElement('div');
		els=me._gallery_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGcgaWQ9ImdhbGxlcnkiPgogIDxnIGlkPSJzaGFkb3ciIG9wYWNpdHk9IjAuODgiPgogICA8aW1hZ2UgaGVpZ2h0PSIxMjQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSVFBQUFCOENBWUFBQUNvaFJqVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFOWUVsRVFWUjRYdTJkYVhmYk'+
			'9CSkZMeVY1aloxMjRxUXowL1AvLzlwMHBqdE9IQyt5SEZuU2ZDaThWSUdtN2F5SFVLZmVPVGphS0pJR0xtc0RLSGViellaVVNwbzh0VUhxMTFJQ2thcVVRS1FxSlJDcFNnbEVxbElDa2FxVVFLUXFKUkNwU2dsRXFsSUNrYXFVUUtRcUpSQ3BTZ2xFcWxJQ2thcVVRS1FxSlJDcFNnbEVxbElDa2FxVVFLUXFKUkNwU2dsRXFsSUNrYXFVUUtRcUpSQ3BTZ2xFcWxJQ2thcVVRS1FxSlJDcFNnbEVxdExzcVEzR1VOZDEzZERiQSsrTm9lcDIrYzAvN1BiNXJwVy9KMERROVJxMEE0TzB3Y0hRODgwL0FZNG1nQ2d3VEVLYmh1ZDlPTWJXSnJRMXNPbzlialVZbzd1TUFNTU0yQUYyUzl1aEJnUEdoMElETFFEdWdF'+
			'K2gzWlgzRTRodlVRK0dYZUFRZUZZZUQ0QTlISXF4WVpBMjJLQXZnUVV3QjY1TFd3Q2JydXUyMWtxTUNrVFJCTE1HaDhCdndBdmdCRGd1Nyszd2VEYlVCK1ZuRDRTc3d3SzRBajRDSDhKbmFqLzdQSDZLeGdaQ0ZtSVhzd3d2Z0RmQTcrWDVNeHlJR01nOUZYQkdQdzgvWm5CMEhGbUlHK0FjMkMvdmZRSnV5Mk1yMXV5ck5Sb1F4VjEwbUV1UXV6akJZUGdET01XQW1PR0RzQzVmSHdvOFlUallXMVBEOGEzU2NTYTRoZGd2bjkxZzF1SUtPNit1SzM1amFFY3RhelFnaXRUQk8xak1jSXhaaGxQZ0ZYNzFMVXRibGU4bzV0aWhkaWtDWVlsZHFVczgwUHNlTXg1am5WbDV2WVB0OXhvRGQ1K24zVnZ6YWdXSUtSWk'+
			'FLcWhVQjg4d00zeUxYWVdyOHQ0ZTF2a1JETXJuaXZiWDVYc0xISTV2Z1VLV1RNYzl3STRwS0pRVnphalQ1SzNVMkVCQURZV3VlTG1KVzh3TW4yTlg0aHJyL09PeXpVSDRYa2R0U1JiQUJYQ0pad0FDNVd1aGlHN3RPWENFV3dpb2F5Z0p4SGRJblRmcE5ibUpCUmJCbjJGZ2JQQzQ0b2phZldoZnk3THZKUWJDKzdLUEt4eUtvZUJVNmdlamluUDJNUkJmbHZZTWQxRkRnSFVQdk4rMHhnU2lueVhFd1BBT3N3N1gyRlYramdkc3NoNXlNd2VsVFhDM01DK3YxM2cySUNnKzRRTTlGSlFPcFk3VGNvd1REQUJCTzZVR1lxdXRBNHdMUkZUc1JBM0tFbzhkYnJDQlZLRnFEN3RDajBvVEVIZGxYNTh3VnlITGNZZkR0'+
			'Y0FIVSs1cGlpbFdIeFdNVWo0L0xOL2J4NDY5Vi9ZL1pDRzJGb3BXZ0lnU0VPQURwTmZLUm80d1gvNGNNK01IK01BTGpPdndtZjdPTzl5bEtHNVJka0Q1N0FaM1daK3dZd3VZZlR4SXZjT3QxWkRibTVUNXVxMnFXcllJaEJSOXVTSjZaU0t5RE1wSTlzbzJTa3VYT0RBeFk1bmk5UXRWUm8veGVvSUNVWEI0MXVIMUtqUzVsSDVRdkZ1K3Q5RjJYZGR0MkJJd1dnWkNVb2QzV0dmdjQzSERQcDUyS3ZoYmw4OE9xZWRFdE4yNnZENEJYdU1CSXBoVk9jT0xUOUZ0YkxnUGFRUkJ4N3d0bnkzd09zZ2RzT3E2cnZuMUU5c0FCSGl3TnFXK3l2dXBYbjhiQmFFejNNSk1NZXZ5R3ZnUFZpby9Mc2U1S050c3FHY3cxOX'+
			'lQQ3dTRTB0RmpESUFwQnRZTkJzVUNMMm12dXE1cmVvcDhXNERRbGJucU5hVjlBbVROL1cwVTlHbndEckJxNkw4d0lQN0FYTWNHeTBZbTJPRE44V0MyUHo4aCtHU1pkSDQ3R0d6ejBxNnc0UGFxN091V1VpZHAxVnEwRG9RQ1RKbHZaUjBhckJzOElKU1pINXFTVnZZaGQvTUtBK0lQRElybjVWaUhlTm9hQjNKTm5aN0tFaWxtMkN2N2ZvNVhSNi94bWRBUDVibk9wMWxyMFRJUXV1cGlDanJGTy9rM2JCQVVSQ3JMbUpmUFZaQlNxZ2xlUzNpTnVZbzM1Zmx4T1paSzVSZmx1NnFRM3BYdlI5YzB3YWZ0cC9pNXJuRUw4d0Y0aDhVb0IyVi9GelJzTFZvR0F0eE5MTEVPWHVFMWlGaU1VdHE1eEs3c00rQlA0Qzlz'+
			'RUJabFc3bUwxNlc5S3E5Vll3QXZaSjFpQTNxSnh4SXhYb25CNUFIMUNxOVlFTlBhRHAzekhtNHRiaWlCWjlkMTZ4YWcyQVlnNGhWM2cvdnVuZkw1QWdkQ2FlUGZ3TnZTenJHcmNRY2JtRk1jaGhQTTUydFdkWTFabnBkbHUvZlk0Q2s0bkhMZlFxaFFGYk9lRGp2bmwzaHFxelQ1c0d6M0Fldi9hMHhOUU5FNkVPQVdZb0VIaVBMZDZuZ042QTF1cHYvR0J2UzZiTGVIRGM1cGFTL3dLdWN1bnE3R0tmaXpzajhObXFhMyt5bW5vRkNhT3l2N1V4Mmszd1NPQ2w3U2NtejMwVG9RTWJ0UUhBRm1CZFN4R3V3VkZnU2VZVUM4TDYvWGVERkxBLzBTRzZ4RGZPcGFGa0l6bWk4eEs2STVFS1dlY1pwN2dxZTBzVWF5aX'+
			'hlL1lrM2tNSHl1dmgvS2pFWlQ2MEJJTVdEck4yVWdjaXZYMkFET3kvczdHRHduT0F5LzRSVk8rWDBGbGRGS3lIVmM0QVdtUGhEUldxanVvUUZYUVN5Mldmbk9pbnF1UmtHbUtxQ2phQnVBNkp0bnBYaHhNWTBHNllhNkVLV3I5QVYydGIvQ0JsbmxhcFd6SXhCeDNZT0ErSWdCdDhCTi9RUlQxMnM2VncxOExKSUpoQVVXckg2Z0RraVYxbzZtMW9GUUordHEyNkUyNTYreEszK0tkYkpTenhYdXg0K3dtb05TekJNTW9uaTE2bGh5QWYxWTRpTytXRWNCYmF4TFNIRmZna0hieVIzMTR3akIzSVMyQVlncGZ0WE9NQmplWUlQOGI4ejh6L0JGcjdJaWx6Z1F2NWZ0VHpHZ2RGWEdORkxIaTFaQ0dZY3lEUVdCc2hM'+
			'eHUzMzE5eHVQRlF0dWNuMmp1WW1vbG9FUURNcjF3UVk4d3ZBR0IrSVdEOXFPOEJWV0I5aWcvazV0SFlZR3RHOGxqdkRZUXhab1JXM21uNUlDWThVNU4zZ1ZkWTVQZ3NVWjFOSFVLaERSRjZzUXRZZVpjUUh4R2hzb3JhOVVnVXBMM2VaWTUrNWlWa0VGSWxtUklaOGRYZFF1ZGx4WkNWVTdiL0VBTWJxRUlmVXJyVVBsN0t2eVdWemFONXBhQkVLRE1zRk45NnE4cC9zMkZCd3FkWnhpSGErQk9zSTZPV1lPc2g0UmhxR0JqRlppSDA5WGxmSnFlWjZDMG9mOGYzUUxuM0FZenJBYXlUdThOQzRnc2pEMWdHSVZVQ3VjWjNqWldabUNTc0hLRXFLTDBSV25mV2s5UkF3a2h6UmtKVFJwQlhaT0ViNGhLNkZCWFdQbm'+
			'9hemlQUWJEM3hnWUh6SEF0REpyVkJpZ1RTQ2lkVkM2ZG9jdmFsRmdxS0pTVEFGamVyb08rOVIrSnR3UEpJZWtjeENVeC9pTTZSNCtyOUhQVktJVUxFWlhFYTFEZnlYNDZOWUIyZ09pUHhDcUk0Q1huaFVZN3VFbVd3T2k1MVBxcXkyNkliMStUTm8rWmpoeVczdjRGUzNYMG85SFluVjFqaFcyWkIxVVJiM0VyWU5LOHFPck5TQ2dqdkpWQXBiUFBxSmVPRHVVTnFwaiswREV4eTlSSDA2NW4xM3FPOEcwbmZZZHE2b0x6QXBvZnVVZDdpb1VPNnhveERwQVcwRDByOG9EekJMSTcrdTlPQmN3WlBxL1pmQ0hGTTlucDd3blFIUjdZWVFpQXFFNWlUazIrTyt3cVhoTnVGM2lVOStyVm1DQXRvQ0ErMWZsRVY2aFZH'+
			'QVlxM3ZmTytoUFNlY1Q0WXZ4U0VlZEx2YlR6T2dxL3VKK1p0R01xNUJhQldKR2ZWZVdyTVNVWVZmeHM2VDl4elJWY1VpLzBxajNCSWp1U1JVTWZldlFUQ0FaMVJvUVVKdnBYZHhDeEtzeW11ZWZDWVVHSzRLZzJrWS8zUlFnY2lVWGVGYnhGM1hzMEZRZ0dUVW1FTkhNYnJqZk9kRThQNWJyLzZoT2ZRaXNvZk9LandKQmJZTUZrMmNZQ1AranRnN05GS0dHTkNZUVVNUFE3MWcxdlQrVU5md0lmYzIrRkRER2RSaTY1VThMVzVhWXV4QU1zZzVhWE51c2RZRHhnUUR2WkUzK0xQQ2w5bk5zd0I0ckVYK3R1dENHWGorbTZCYTAzRDdlakt5cTVFY01oajh4NjlBUEpKdTBEakErRU5FeWFNWFRKZGFCejhvMld2VH'+
			'lwWVAybUJRTHFNa2R4UmdoYnRzZnRBaUVaaXpqL1J1YXlUekhnSGlMWlJheURzMmxtWDIxQWtTczZKM2gxY2xyUE12NEVUQUlnSmpDS29ONUtuT0o4TjVTTDlmN2lQOWFqV1l6RlV4cWtXNlRhV1pmb3dHeDJXdzI1YTdvYUIwK1lGa0Y1WFZjNnZZOVFNZ0N4QUxYTTN6aGE3OE0zajlXUDg2UnUxamdWazAzQjZscHhYYlRhV1pmb3dGUnBFN1c5TERPNXhicnpEaUIxWS91djBZQ1F2TVN6L0VmU0ZXUUdLR0kzNE1haVBpekFIMTNkNDZ2K2o3SDV5dTBBS1pwR0dCOElLQjJHV0FkZmsyOVJENm1uTjhLeEF5ZnVUekZqa2w1WDVWUWJkc1BPZ1dFbnVzN003d1BsNWdsdUtTT0t6NW5GYTFiQnhnWmlPSTJk'+
			'TldCZGJiZ1VESHFzY1VzWDZvNFlYYUNIVytLcjk0K3hPL3g2QmVkSWhDeUNJcHBscmdGMDdrcjgvaDhVeTliNENxa1VZR0FlMURJV3VoZXpEZ29Qd29JcldYUXI5RkVJUFJMTkxJQU9nZEpaV3I5UE1DbnNKMytobVZwY2kxYkF3TTBBQVJVVUdqbVVJdFJ2c2ROUkNuRlhHSDcwdVNaVmx6RndkZDhpY0RveHhXcjhscVBHN3lHY292WEk3WWladWlyQ1NDQWVEL2o1aWY4aTZVT2gyR0N4d3o2KzNWMXE2M3htRUdRUkNnRWdxeVphaEtLR1Q3ZmdiVk4xZ0VhQWlMcWdVNzg1bzROZ0drQUwvRFlRRlBWODlBV1dLd1JmN1JNVmtSdTRRYWYwZFR2UGx3VGxzVHhIZWM4bHBvRTRrZHJJSGdGTi9XcUplam5mMV'+
			'JnaXZlQjZpNXh1WjFyL0JkMnRRcnFuSHBKL1ZiRkR0SXZBUVRjZzBJRk1Wa0hsWndGaEtxTld1NnYzNUhRNGwxTlhyM0ZTdFNxTzh6WmtvcmtRL3BsZ0lBS2lwaEMzdUdWUjBFaElONVQvM3lBMWxaZVlhWHAvMkpBTkwvdzVVdjFTd0VCbitNVGxjMWo5VEZhQzgxUHFBVDlndm8zcmVibHM3ZlU4eFZOVDIxL2lYNDVJS1FIckVVTU1BWEZPZmQvUWxuckpSVkR4RVd6VzJzZGdEYitiK2ZZQ3YvdVNTbW1aa04xQzJDY0JGT21vVWt0WlJkYU9yZDFxV1pVQWhIMENCaDcxSk5mcWxacXhuT3JNNHVvQkdKQUEyREVpcVdLVWdwSVB4ZXp0aDBHU0NBZVZROE1QVXFLUGJheUl2bVFFb2d2VUtoMDlzdm5HM2l3'+
			'c3JxVlNpQlNsYUlKVEtVU2lGU3RCQ0pWS1lGSVZVb2dVcFVTaUZTbEJDSlZLWUZJVlVvZ1VwVVNpRlNsQkNKVktZRklWVW9nVXBVU2lGU2xCQ0pWS1lGSVZVb2dVcFVTaUZTbEJDSlZLWUZJVlVvZ1VwVVNpRlNsQkNKVktZRklWVW9nVXBVU2lGU2xCQ0pWS1lGSVZVb2dVcFVTaUZTbC93TnhubEw3U2cxZllRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMgLTI5KSIgd2lkdGg9IjEzMiIvPgogIDwvZz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMy4zLDYuOWwtLjQuNFY0NC41bC40LjQuNC40SDQ1LjhsLjMtLjMuNC0uNFY3LjNsLS40LS40LS40LS40SDMuN1pNND'+
			'QuMSw5LjFzLjEsNi44LDAsMTQuOVYzOC45TDM4LjUsMjcuN2MtNS4zLTEwLjYtNS42LTExLjEtNi0xMS4zYS45LjksMCwwLDAtMS4zLjFsLTQuNyw4Yy0yLjQsNC4zLTQuNCw3LjgtNC41LDcuOGwtMy4yLTMuMWMtMy4xLTMuMS0zLjMtMy4yLTMuNy0zLjJoLS43Yy0uMS4xLTEuNywyLjMtNC43LDdMNS4zLDQwVjkuMUM1LjQsOC44LDQ0LDguOCw0NC4xLDkuMVoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTQuNiwxMS42YTYuNSw2LjUsMCwwLDAtNC4xLDMuOCw2LjQsNi40LDAsMCwwLS4zLDIsNy42LDcuNiwwLDAsMCwuMywyLjEsNy44LDcuOCwwLDAsMCwxLjYsMi40LDYuMSw2LjEsMCww'+
			'LDAsOC4zLS4xLDUuOSw1LjksMCwwLDAsLjktNy42LDYuMSw2LjEsMCwwLDAtMy41LTIuNkE4LjYsOC42LDAsMCwwLDE0LjYsMTEuNloiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNDkuNSwxOS43Yy0uNi40LS42LS4yLS42LDEyLjVzMCwxMi4xLjYsMTIuNmExLjIsMS4yLDAsMCwwLDEuNC0uMWMuNC0uMywxMC4xLTE2LjksMTAuMi0xNy40czAtLjgtNS40LTQuNFM1MC4yLDE5LjIsNDkuNSwxOS43WiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00Ni42LDQ3LjVjLTEuMS43LS44LjYtOC45LjNIMjkuM2wtLjMuM2ExLDEsMCwwLDAtLjEsMS41aDBjLjUuNCwxMy43LDcuNywxNCw3LjdzLj'+
			'ktLjMsMy4zLTQuNSwyLjYtNC41LDIuMy01LjFhMS45LDEuOSwwLDAsMC0xLjEtLjdaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._gallery_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Gallery_ico";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 56px;';
		hs+='position : absolute;';
		hs+='right : 185px;';
		hs+='visibility : hidden;';
		hs+='width : 56px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gallery_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gallery_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._gallery_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._gallery_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._gallery_ico.style[domTransition]='';
				if (me._gallery_ico.ggCurrentLogicStateVisible == 0) {
					me._gallery_ico.style.visibility="hidden";
					me._gallery_ico.ggVisible=false;
				}
				else {
					me._gallery_ico.style.visibility="hidden";
					me._gallery_ico.ggVisible=false;
				}
			}
		}
		me._gallery_ico.onclick=function (e) {
			player.setVariableValue('open_popup', true);
			if (player.transitionsDisabled) {
				me._popup.style[domTransition]='none';
			} else {
				me._popup.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup.ggParameter.sx=1;me._popup.ggParameter.sy=1;
			me._popup.style[domTransform]=parameterToTransform(me._popup.ggParameter);
			me._popup_frame.ggText="<iframe src=\"assets\/gallery\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
			me._popup_frame.ggTextDiv.innerHTML=me._popup_frame.ggText;
			if (me._popup_frame.ggUpdateText) {
				me._popup_frame.ggUpdateText=function() {
					var hs="<iframe src=\"assets\/gallery\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._popup_frame.ggUpdatePosition) {
				me._popup_frame.ggUpdatePosition();
			}
			me._popup_frame.ggTextDiv.scrollTop = 0;
		}
		me._gallery_ico.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="B\u1ed9 s\u01b0u t\u1eadp \u1ea3nh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="B\u1ed9 s\u01b0u t\u1eadp \u1ea3nh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Gallery";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Gallery";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._gallery_ico.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
		}
		me._gallery_ico.ggUpdatePosition=function (useTransition) {
		}
		me._remote_container.appendChild(me._gallery_ico);
		el=me._map_4d_icon=document.createElement('div');
		els=me._map_4d_icon__img=document.createElement('img');
		els.className='ggskin ggskin_map_4d_icon';
		hs=basePath + 'images/map_4d_icon.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_4d_icon";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 5px;';
		hs+='cursor : pointer;';
		hs+='height : 54px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 200px;';
		hs+='visibility : hidden;';
		hs+='width : 54px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_4d_icon.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_4d_icon.onclick=function (e) {
			player.setVariableValue('map_4d', true);
			me._iframe_map4d.ggText="<iframe src=\"https:\/\/map.map4d.vn\/?camera=15.931520,108.301383,19.00,64.0,-171.9,1\" width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"border:0\" allowfullscreen><\/iframe>";
			me._iframe_map4d.ggTextDiv.innerHTML=me._iframe_map4d.ggText;
			if (me._iframe_map4d.ggUpdateText) {
				me._iframe_map4d.ggUpdateText=function() {
					var hs="<iframe src=\"https:\/\/map.map4d.vn\/?camera=15.931520,108.301383,19.00,64.0,-171.9,1\" width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"border:0\" allowfullscreen><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._iframe_map4d.ggUpdatePosition) {
				me._iframe_map4d.ggUpdatePosition();
			}
			me._iframe_map4d.ggTextDiv.scrollTop = 0;
		}
		me._map_4d_icon.onmouseover=function (e) {
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Map 4D";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Map 4D";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Map 4D";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Map 4D";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			player.setVariableValue('tooltip_hover', true);
		}
		me._map_4d_icon.onmouseout=function (e) {
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			player.setVariableValue('tooltip_hover', false);
		}
		me._map_4d_icon.ggUpdatePosition=function (useTransition) {
		}
		me._remote_container.appendChild(me._map_4d_icon);
		me.divSkin.appendChild(me._remote_container);
		el=me._controler_m=document.createElement('div');
		el.ggId="controler_m";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 36px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controler_m.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controler_m.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._controler_m.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._controler_m.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._controler_m.style[domTransition]='';
				if (me._controler_m.ggCurrentLogicStateVisible == 0) {
					me._controler_m.style.visibility=(Number(me._controler_m.style.opacity)>0||!me._controler_m.style.opacity)?'inherit':'hidden';
					me._controler_m.ggVisible=true;
				}
				else {
					me._controler_m.style.visibility="hidden";
					me._controler_m.ggVisible=false;
				}
			}
		}
		me._controler_m.ggUpdatePosition=function (useTransition) {
		}
		el=me._video_pad_m=document.createElement('div');
		el.ggId="video_pad_m";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 41px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_pad_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._video_pad_m.onclick=function (e) {
			player.setVariableValue('open_video', true);
			if (player.transitionsDisabled) {
				me._popup_video.style[domTransition]='none';
			} else {
				me._popup_video.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup_video.ggParameter.sx=1;me._popup_video.ggParameter.sy=1;
			me._popup_video.style[domTransform]=parameterToTransform(me._popup_video.ggParameter);
			me._video_ytb.ggInitMedia("kLknzT-UUbY");
			player.changeVolume("_main",0);
		}
		me._video_pad_m.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="M\u1edf Video";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="M\u1edf Video";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Open Video";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Open Video";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._video_pad_m.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
		}
		me._video_pad_m.ggUpdatePosition=function (useTransition) {
		}
		el=me._video_ico_m=document.createElement('div');
		els=me._video_ico_m__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik0zMC43LDE0LjNhNC40LDQuNCwwLDAsMC00LjcsMCw0LjcsNC43LDAsMCwwLTIuNCw0LjFWMzAuNkE0LjgsNC44LDAsMCwwLDI2LDM0LjhhNC42LDQuNiwwLDAsMCwyLjMuNiw0LjgsNC44LDAsMCwwLDIuNC0uNmwxMC41LTYuMWE0LjgsNC44LDAsMCwwLDAtOC4zWk0yOC41LDMwLjRWMTguNmwxMC4xLDUuOVptMjkuOS00LjJWMTAuNWE0LjksNC45LDAsMC'+
			'wwLTQuOS00LjloLTQzYTQuOSw0LjksMCwwLDAtNC45LDQuOVYzOC42YTQuOSw0LjksMCwwLDAsNC45LDQuOWg0M2E0LjksNC45LDAsMCwwLDQuOS00LjksMi41LDIuNSwwLDAsMSw0LjksMCw5LjgsOS44LDAsMCwxLTkuOCw5LjhoLTQzQTkuOCw5LjgsMCwwLDEsLjcsMzguNlYxMC41QTkuOCw5LjgsMCwwLDEsMTAuNS43aDQzYTkuOCw5LjgsMCwwLDEsOS44LDkuOFYyNi4yYTIuNSwyLjUsMCwxLDEtNC45LDBabTQuOSwzMi4xYTIuNSwyLjUsMCwwLDEtMi40LDIuNUgyOS40YTIuNSwyLjUsMCwwLDEsMC00LjlINjAuOUEyLjQsMi40LDAsMCwxLDYzLjMsNTguM1ptLTQxLjIuMWE0LjksNC45LDAs'+
			'MCwxLTQuOSw0LjksNC44LDQuOCwwLDAsMS00LjMtMi41SDMuMWEyLjUsMi41LDAsMCwxLDAtNC45SDEzYTUsNSwwLDAsMSw0LjItMi40QTQuOSw0LjksMCwwLDEsMjIuMSw1OC40WiIvPgo8L3N2Zz4K';
		me._video_ico_m__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="video_ico_m";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 28px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 28px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_ico_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._video_ico_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_pad_m.appendChild(me._video_ico_m);
		me._controler_m.appendChild(me._video_pad_m);
		el=me._map_4d_icon_m=document.createElement('div');
		els=me._map_4d_icon_m__img=document.createElement('img');
		els.className='ggskin ggskin_map_4d_icon_m';
		hs=basePath + 'images/map_4d_icon_m.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_4d_icon_m";
		el.ggDx=0;
		el.ggDy=82;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_4d_icon_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_4d_icon_m.onclick=function (e) {
			player.setVariableValue('map_4d', true);
			if (player.transitionsDisabled) {
				me._container_map_4d.style[domTransition]='none';
			} else {
				me._container_map_4d.style[domTransition]='all 700ms ease-out 0ms';
			}
			me._container_map_4d.ggParameter.sx=1;me._container_map_4d.ggParameter.sy=1;
			me._container_map_4d.style[domTransform]=parameterToTransform(me._container_map_4d.ggParameter);
			me._iframe_map4d.ggText="<iframe src=\"https:\/\/map.map4d.vn\/?camera=15.931520,108.301383,19.00,64.0,-171.9,1\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\"><\/iframe>";
			me._iframe_map4d.ggTextDiv.innerHTML=me._iframe_map4d.ggText;
			if (me._iframe_map4d.ggUpdateText) {
				me._iframe_map4d.ggUpdateText=function() {
					var hs="<iframe src=\"https:\/\/map.map4d.vn\/?camera=15.931520,108.301383,19.00,64.0,-171.9,1\" width=\"100%\" height=\"100%\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" frameborder= \"0\"><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._iframe_map4d.ggUpdatePosition) {
				me._iframe_map4d.ggUpdatePosition();
			}
			me._iframe_map4d.ggTextDiv.scrollTop = 0;
		}
		me._map_4d_icon_m.onmouseover=function (e) {
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Map 4D";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Map 4D";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="Map 4D";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Map 4D";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			player.setVariableValue('tooltip_hover', true);
		}
		me._map_4d_icon_m.onmouseout=function (e) {
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
			player.setVariableValue('tooltip_hover', false);
		}
		me._map_4d_icon_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._controler_m.appendChild(me._map_4d_icon_m);
		el=me._info_pad_m=document.createElement('div');
		el.ggId="info_pad_m";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_pad_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_pad_m.onclick=function (e) {
			player.setVariableValue('hs_info_c', true);
			if (player.transitionsDisabled) {
				me._container_info_c.style[domTransition]='none';
			} else {
				me._container_info_c.style[domTransition]='all 700ms ease-out 0ms';
			}
			me._container_info_c.ggParameter.sx=1;me._container_info_c.ggParameter.sy=1;
			me._container_info_c.style[domTransform]=parameterToTransform(me._container_info_c.ggParameter);
			me._info_image_c.ggText=basePath + me.ggUserdata.copyright;
			me._info_image_c.ggSubElement.style.width = '0px';
			me._info_image_c.ggSubElement.style.height = '0px';
			me._info_image_c.ggSubElement.src='';
			me._info_image_c.ggSubElement.src=me._info_image_c.ggText;
			me._text_info_c.ggText=me.ggUserdata.information;
			me._text_info_c.ggTextDiv.innerHTML=me._text_info_c.ggText;
			if (me._text_info_c.ggUpdateText) {
				me._text_info_c.ggUpdateText=function() {
					var hs=me.ggUserdata.information;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info_c.ggUpdatePosition) {
				me._text_info_c.ggUpdatePosition();
			}
			me._text_info_c.ggTextDiv.scrollTop = 0;
			me._text_info_c2.ggText="<iframe src=\"https:\/\/drive.google.com\/file\/d\/1gmXWc59WxQMzsx0Rv_DA6SKeLzTCtWNx\/view?usp=sharing\" width=\"100%\" height=\"100%\" allow=\"autoplay\"><\/iframe>";
			me._text_info_c2.ggTextDiv.innerHTML=me._text_info_c2.ggText;
			if (me._text_info_c2.ggUpdateText) {
				me._text_info_c2.ggUpdateText=function() {
					var hs="<iframe src=\"https:\/\/drive.google.com\/file\/d\/1gmXWc59WxQMzsx0Rv_DA6SKeLzTCtWNx\/view?usp=sharing\" width=\"100%\" height=\"100%\" allow=\"autoplay\"><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info_c2.ggUpdatePosition) {
				me._text_info_c2.ggUpdatePosition();
			}
			me._text_info_c2.ggTextDiv.scrollTop = 0;
		}
		me._info_pad_m.ggUpdatePosition=function (useTransition) {
		}
		el=me._info_ico_m=document.createElement('div');
		els=me._info_ico_m__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._info_ico_m__img.setAttribute('src',basePath + 'images/info_ico_m.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="info_ico_m";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_ico_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_ico_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._info_pad_m.appendChild(me._info_ico_m);
		me._controler_m.appendChild(me._info_pad_m);
		el=me._gallery_pad_m=document.createElement('div');
		el.ggId="gallery_pad_m";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 81px;';
		hs+='visibility : hidden;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gallery_pad_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gallery_pad_m.onclick=function (e) {
			player.setVariableValue('open_popup', true);
			if (player.transitionsDisabled) {
				me._popup.style[domTransition]='none';
			} else {
				me._popup.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup.ggParameter.sx=1;me._popup.ggParameter.sy=1;
			me._popup.style[domTransform]=parameterToTransform(me._popup.ggParameter);
			me._popup_frame.ggText="<iframe src=\"assets\/gallery\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
			me._popup_frame.ggTextDiv.innerHTML=me._popup_frame.ggText;
			if (me._popup_frame.ggUpdateText) {
				me._popup_frame.ggUpdateText=function() {
					var hs="<iframe src=\"assets\/gallery\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._popup_frame.ggUpdatePosition) {
				me._popup_frame.ggUpdatePosition();
			}
			me._popup_frame.ggTextDiv.scrollTop = 0;
		}
		me._gallery_pad_m.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="B\u1ed9 s\u01b0u t\u1eadp \u1ea3nh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="B\u1ed9 s\u01b0u t\u1eadp \u1ea3nh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Gallery";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Gallery";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._gallery_pad_m.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
		}
		me._gallery_pad_m.ggUpdatePosition=function (useTransition) {
		}
		el=me._gallery_ico_m=document.createElement('div');
		els=me._gallery_ico_m__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGcgaWQ9ImdhbGxlcnkiPgogIDxnIGlkPSJzaGFkb3ciIG9wYWNpdHk9IjAuODgiPgogICA8aW1hZ2UgaGVpZ2h0PSIxMjQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSVFBQUFCOENBWUFBQUNvaFJqVEFBQUFDWEJJV1hNQUFBc1NBQUFMRWdIUzNYNzhBQUFOWUVsRVFWUjRYdTJkYVhmYk'+
			'9CSkZMeVY1aloxMjRxUXowL1AvLzlwMHBqdE9IQyt5SEZuU2ZDaThWSUdtN2F5SFVLZmVPVGphS0pJR0xtc0RLSGViellaVVNwbzh0VUhxMTFJQ2thcVVRS1FxSlJDcFNnbEVxbElDa2FxVVFLUXFKUkNwU2dsRXFsSUNrYXFVUUtRcUpSQ3BTZ2xFcWxJQ2thcVVRS1FxSlJDcFNnbEVxbElDa2FxVVFLUXFKUkNwU2dsRXFsSUNrYXFVUUtRcUpSQ3BTZ2xFcWxJQ2thcVVRS1FxSlJDcFNnbEVxdExzcVEzR1VOZDEzZERiQSsrTm9lcDIrYzAvN1BiNXJwVy9KMERROVJxMEE0TzB3Y0hRODgwL0FZNG1nQ2d3VEVLYmh1ZDlPTWJXSnJRMXNPbzlialVZbzd1TUFNTU0yQUYyUzl1aEJnUEdoMElETFFEdWdF'+
			'K2gzWlgzRTRodlVRK0dYZUFRZUZZZUQ0QTlISXF4WVpBMjJLQXZnUVV3QjY1TFd3Q2JydXUyMWtxTUNrVFJCTE1HaDhCdndBdmdCRGd1Nyszd2VEYlVCK1ZuRDRTc3d3SzRBajRDSDhKbmFqLzdQSDZLeGdaQ0ZtSVhzd3d2Z0RmQTcrWDVNeHlJR01nOUZYQkdQdzgvWm5CMEhGbUlHK0FjMkMvdmZRSnV5Mk1yMXV5ck5Sb1F4VjEwbUV1UXV6akJZUGdET01XQW1PR0RzQzVmSHdvOFlUallXMVBEOGEzU2NTYTRoZGd2bjkxZzF1SUtPNit1SzM1amFFY3RhelFnaXRUQk8xak1jSXhaaGxQZ0ZYNzFMVXRibGU4bzV0aWhkaWtDWVlsZHFVczgwUHNlTXg1am5WbDV2WVB0OXhvRGQ1K24zVnZ6YWdXSUtSWk'+
			'FLcWhVQjg4d00zeUxYWVdyOHQ0ZTF2a1JETXJuaXZiWDVYc0xISTV2Z1VLV1RNYzl3STRwS0pRVnphalQ1SzNVMkVCQURZV3VlTG1KVzh3TW4yTlg0aHJyL09PeXpVSDRYa2R0U1JiQUJYQ0pad0FDNVd1aGlHN3RPWENFV3dpb2F5Z0p4SGRJblRmcE5ibUpCUmJCbjJGZ2JQQzQ0b2phZldoZnk3THZKUWJDKzdLUEt4eUtvZUJVNmdlamluUDJNUkJmbHZZTWQxRkRnSFVQdk4rMHhnU2lueVhFd1BBT3N3N1gyRlYramdkc3NoNXlNd2VsVFhDM01DK3YxM2cySUNnKzRRTTlGSlFPcFk3VGNvd1REQUJCTzZVR1lxdXRBNHdMUkZUc1JBM0tFbzhkYnJDQlZLRnFEN3RDajBvVEVIZGxYNTh3VnlITGNZZkR0'+
			'Y0FIVSs1cGlpbFdIeFdNVWo0L0xOL2J4NDY5Vi9ZL1pDRzJGb3BXZ0lnU0VPQURwTmZLUm80d1gvNGNNK01IK01BTGpPdndtZjdPTzl5bEtHNVJka0Q1N0FaM1daK3dZd3VZZlR4SXZjT3QxWkRibTVUNXVxMnFXcllJaEJSOXVTSjZaU0t5RE1wSTlzbzJTa3VYT0RBeFk1bmk5UXRWUm8veGVvSUNVWEI0MXVIMUtqUzVsSDVRdkZ1K3Q5RjJYZGR0MkJJd1dnWkNVb2QzV0dmdjQzSERQcDUyS3ZoYmw4OE9xZWRFdE4yNnZENEJYdU1CSXBoVk9jT0xUOUZ0YkxnUGFRUkJ4N3d0bnkzd09zZ2RzT3E2cnZuMUU5c0FCSGl3TnFXK3l2dXBYbjhiQmFFejNNSk1NZXZ5R3ZnUFZpby9Mc2U1S050c3FHY3cxOX'+
			'lQQ3dTRTB0RmpESUFwQnRZTkJzVUNMMm12dXE1cmVvcDhXNERRbGJucU5hVjlBbVROL1cwVTlHbndEckJxNkw4d0lQN0FYTWNHeTBZbTJPRE44V0MyUHo4aCtHU1pkSDQ3R0d6ejBxNnc0UGFxN091V1VpZHAxVnEwRG9RQ1RKbHZaUjBhckJzOElKU1pINXFTVnZZaGQvTUtBK0lQRElybjVWaUhlTm9hQjNKTm5aN0tFaWxtMkN2N2ZvNVhSNi94bWRBUDVibk9wMWxyMFRJUXV1cGlDanJGTy9rM2JCQVVSQ3JMbUpmUFZaQlNxZ2xlUzNpTnVZbzM1Zmx4T1paSzVSZmx1NnFRM3BYdlI5YzB3YWZ0cC9pNXJuRUw4d0Y0aDhVb0IyVi9GelJzTFZvR0F0eE5MTEVPWHVFMWlGaU1VdHE1eEs3c00rQlA0Qzlz'+
			'RUJabFc3bUwxNlc5S3E5Vll3QXZaSjFpQTNxSnh4SXhYb25CNUFIMUNxOVlFTlBhRHAzekhtNHRiaWlCWjlkMTZ4YWcyQVlnNGhWM2cvdnVuZkw1QWdkQ2FlUGZ3TnZTenJHcmNRY2JtRk1jaGhQTTUydFdkWTFabnBkbHUvZlk0Q2s0bkhMZlFxaFFGYk9lRGp2bmwzaHFxelQ1c0d6M0Fldi9hMHhOUU5FNkVPQVdZb0VIaVBMZDZuZ042QTF1cHYvR0J2UzZiTGVIRGM1cGFTL3dLdWN1bnE3R0tmaXpzajhObXFhMyt5bW5vRkNhT3l2N1V4Mmszd1NPQ2w3U2NtejMwVG9RTWJ0UUhBRm1CZFN4R3V3VkZnU2VZVUM4TDYvWGVERkxBLzBTRzZ4RGZPcGFGa0l6bWk4eEs2STVFS1dlY1pwN2dxZTBzVWF5aX'+
			'hlL1lrM2tNSHl1dmgvS2pFWlQ2MEJJTVdEck4yVWdjaXZYMkFET3kvczdHRHduT0F5LzRSVk8rWDBGbGRGS3lIVmM0QVdtUGhEUldxanVvUUZYUVN5Mldmbk9pbnF1UmtHbUtxQ2phQnVBNkp0bnBYaHhNWTBHNllhNkVLV3I5QVYydGIvQ0JsbmxhcFd6SXhCeDNZT0ErSWdCdDhCTi9RUlQxMnM2VncxOExKSUpoQVVXckg2Z0RraVYxbzZtMW9GUUordHEyNkUyNTYreEszK0tkYkpTenhYdXg0K3dtb05TekJNTW9uaTE2bGh5QWYxWTRpTytXRWNCYmF4TFNIRmZna0hieVIzMTR3akIzSVMyQVlncGZ0WE9NQmplWUlQOGI4ejh6L0JGcjdJaWx6Z1F2NWZ0VHpHZ2RGWEdORkxIaTFaQ0dZY3lEUVdCc2hM'+
			'eHUzMzE5eHVQRlF0dWNuMmp1WW1vbG9FUURNcjF3UVk4d3ZBR0IrSVdEOXFPOEJWV0I5aWcvazV0SFlZR3RHOGxqdkRZUXhab1JXM21uNUlDWThVNU4zZ1ZkWTVQZ3NVWjFOSFVLaERSRjZzUXRZZVpjUUh4R2hzb3JhOVVnVXBMM2VaWTUrNWlWa0VGSWxtUklaOGRYZFF1ZGx4WkNWVTdiL0VBTWJxRUlmVXJyVVBsN0t2eVdWemFONXBhQkVLRE1zRk45NnE4cC9zMkZCd3FkWnhpSGErQk9zSTZPV1lPc2g0UmhxR0JqRlppSDA5WGxmSnFlWjZDMG9mOGYzUUxuM0FZenJBYXlUdThOQzRnc2pEMWdHSVZVQ3VjWjNqWldabUNTc0hLRXFLTDBSV25mV2s5UkF3a2h6UmtKVFJwQlhaT0ViNGhLNkZCWFdQbm'+
			'9hemlQUWJEM3hnWUh6SEF0REpyVkJpZ1RTQ2lkVkM2ZG9jdmFsRmdxS0pTVEFGamVyb08rOVIrSnR3UEpJZWtjeENVeC9pTTZSNCtyOUhQVktJVUxFWlhFYTFEZnlYNDZOWUIyZ09pUHhDcUk0Q1huaFVZN3VFbVd3T2k1MVBxcXkyNkliMStUTm8rWmpoeVczdjRGUzNYMG85SFluVjFqaFcyWkIxVVJiM0VyWU5LOHFPck5TQ2dqdkpWQXBiUFBxSmVPRHVVTnFwaiswREV4eTlSSDA2NW4xM3FPOEcwbmZZZHE2b0x6QXBvZnVVZDdpb1VPNnhveERwQVcwRDByOG9EekJMSTcrdTlPQmN3WlBxL1pmQ0hGTTlucDd3blFIUjdZWVFpQXFFNWlUazIrTyt3cVhoTnVGM2lVOStyVm1DQXRvQ0ErMWZsRVY2aFZH'+
			'QVlxM3ZmTytoUFNlY1Q0WXZ4U0VlZEx2YlR6T2dxL3VKK1p0R01xNUJhQldKR2ZWZVdyTVNVWVZmeHM2VDl4elJWY1VpLzBxajNCSWp1U1JVTWZldlFUQ0FaMVJvUVVKdnBYZHhDeEtzeW11ZWZDWVVHSzRLZzJrWS8zUlFnY2lVWGVGYnhGM1hzMEZRZ0dUVW1FTkhNYnJqZk9kRThQNWJyLzZoT2ZRaXNvZk9LandKQmJZTUZrMmNZQ1AranRnN05GS0dHTkNZUVVNUFE3MWcxdlQrVU5md0lmYzIrRkRER2RSaTY1VThMVzVhWXV4QU1zZzVhWE51c2RZRHhnUUR2WkUzK0xQQ2w5bk5zd0I0ckVYK3R1dENHWGorbTZCYTAzRDdlakt5cTVFY01oajh4NjlBUEpKdTBEakErRU5FeWFNWFRKZGFCejhvMld2VH'+
			'lwWVAybUJRTHFNa2R4UmdoYnRzZnRBaUVaaXpqL1J1YXlUekhnSGlMWlJheURzMmxtWDIxQWtTczZKM2gxY2xyUE12NEVUQUlnSmpDS29ONUtuT0o4TjVTTDlmN2lQOWFqV1l6RlV4cWtXNlRhV1pmb3dHeDJXdzI1YTdvYUIwK1lGa0Y1WFZjNnZZOVFNZ0N4QUxYTTN6aGE3OE0zajlXUDg2UnUxamdWazAzQjZscHhYYlRhV1pmb3dGUnBFN1c5TERPNXhicnpEaUIxWS91djBZQ1F2TVN6L0VmU0ZXUUdLR0kzNE1haVBpekFIMTNkNDZ2K2o3SDV5dTBBS1pwR0dCOElLQjJHV0FkZmsyOVJENm1uTjhLeEF5ZnVUekZqa2w1WDVWUWJkc1BPZ1dFbnVzN003d1BsNWdsdUtTT0t6NW5GYTFiQnhnWmlPSTJk'+
			'TldCZGJiZ1VESHFzY1VzWDZvNFlYYUNIVytLcjk0K3hPL3g2QmVkSWhDeUNJcHBscmdGMDdrcjgvaDhVeTliNENxa1VZR0FlMURJV3VoZXpEZ29Qd29JcldYUXI5RkVJUFJMTkxJQU9nZEpaV3I5UE1DbnNKMytobVZwY2kxYkF3TTBBQVJVVUdqbVVJdFJ2c2ROUkNuRlhHSDcwdVNaVmx6RndkZDhpY0RveHhXcjhscVBHN3lHY292WEk3WWladWlyQ1NDQWVEL2o1aWY4aTZVT2gyR0N4d3o2KzNWMXE2M3htRUdRUkNnRWdxeVphaEtLR1Q3ZmdiVk4xZ0VhQWlMcWdVNzg1bzROZ0drQUwvRFlRRlBWODlBV1dLd1JmN1JNVmtSdTRRYWYwZFR2UGx3VGxzVHhIZWM4bHBvRTRrZHJJSGdGTi9XcUplam5mMV'+
			'JnaXZlQjZpNXh1WjFyL0JkMnRRcnFuSHBKL1ZiRkR0SXZBUVRjZzBJRk1Wa0hsWndGaEtxTld1NnYzNUhRNGwxTlhyM0ZTdFNxTzh6WmtvcmtRL3BsZ0lBS2lwaEMzdUdWUjBFaElONVQvM3lBMWxaZVlhWHAvMkpBTkwvdzVVdjFTd0VCbitNVGxjMWo5VEZhQzgxUHFBVDlndm8zcmVibHM3ZlU4eFZOVDIxL2lYNDVJS1FIckVVTU1BWEZPZmQvUWxuckpSVkR4RVd6VzJzZGdEYitiK2ZZQ3YvdVNTbW1aa04xQzJDY0JGT21vVWt0WlJkYU9yZDFxV1pVQWhIMENCaDcxSk5mcWxacXhuT3JNNHVvQkdKQUEyREVpcVdLVWdwSVB4ZXp0aDBHU0NBZVZROE1QVXFLUGJheUl2bVFFb2d2VUtoMDlzdm5HM2l3'+
			'c3JxVlNpQlNsYUlKVEtVU2lGU3RCQ0pWS1lGSVZVb2dVcFVTaUZTbEJDSlZLWUZJVlVvZ1VwVVNpRlNsQkNKVktZRklWVW9nVXBVU2lGU2xCQ0pWS1lGSVZVb2dVcFVTaUZTbEJDSlZLWUZJVlVvZ1VwVVNpRlNsQkNKVktZRklWVW9nVXBVU2lGU2xCQ0pWS1lGSVZVb2dVcFVTaUZTbC93TnhubEw3U2cxZllRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMgLTI5KSIgd2lkdGg9IjEzMiIvPgogIDwvZz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMy4zLDYuOWwtLjQuNFY0NC41bC40LjQuNC40SDQ1LjhsLjMtLjMuNC0uNFY3LjNsLS40LS40LS40LS40SDMuN1pNND'+
			'QuMSw5LjFzLjEsNi44LDAsMTQuOVYzOC45TDM4LjUsMjcuN2MtNS4zLTEwLjYtNS42LTExLjEtNi0xMS4zYS45LjksMCwwLDAtMS4zLjFsLTQuNyw4Yy0yLjQsNC4zLTQuNCw3LjgtNC41LDcuOGwtMy4yLTMuMWMtMy4xLTMuMS0zLjMtMy4yLTMuNy0zLjJoLS43Yy0uMS4xLTEuNywyLjMtNC43LDdMNS4zLDQwVjkuMUM1LjQsOC44LDQ0LDguOCw0NC4xLDkuMVoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTQuNiwxMS42YTYuNSw2LjUsMCwwLDAtNC4xLDMuOCw2LjQsNi40LDAsMCwwLS4zLDIsNy42LDcuNiwwLDAsMCwuMywyLjEsNy44LDcuOCwwLDAsMCwxLjYsMi40LDYuMSw2LjEsMCww'+
			'LDAsOC4zLS4xLDUuOSw1LjksMCwwLDAsLjktNy42LDYuMSw2LjEsMCwwLDAtMy41LTIuNkE4LjYsOC42LDAsMCwwLDE0LjYsMTEuNloiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNDkuNSwxOS43Yy0uNi40LS42LS4yLS42LDEyLjVzMCwxMi4xLjYsMTIuNmExLjIsMS4yLDAsMCwwLDEuNC0uMWMuNC0uMywxMC4xLTE2LjksMTAuMi0xNy40czAtLjgtNS40LTQuNFM1MC4yLDE5LjIsNDkuNSwxOS43WiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00Ni42LDQ3LjVjLTEuMS43LS44LjYtOC45LjNIMjkuM2wtLjMuM2ExLDEsMCwwLDAtLjEsMS41aDBjLjUuNCwxMy43LDcuNywxNCw3LjdzLj'+
			'ktLjMsMy4zLTQuNSwyLjYtNC41LDIuMy01LjFhMS45LDEuOSwwLDAsMC0xLjEtLjdaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._gallery_ico_m__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Gallery_ico_m";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._gallery_ico_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gallery_ico_m.onclick=function (e) {
			player.setVariableValue('open_popup', true);
			me._popup.style[domTransition]='none';
			me._popup.style.visibility=(Number(me._popup.style.opacity)>0||!me._popup.style.opacity)?'inherit':'hidden';
			me._popup.ggVisible=true;
			if (player.transitionsDisabled) {
				me._popup.style[domTransition]='none';
			} else {
				me._popup.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup.ggParameter.sx=1;me._popup.ggParameter.sy=0.1;
			me._popup.style[domTransform]=parameterToTransform(me._popup.ggParameter);
			me._popup_frame.ggText="<iframe src=\""+me.ggUserdata.author+"\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
			me._popup_frame.ggTextDiv.innerHTML=me._popup_frame.ggText;
			if (me._popup_frame.ggUpdateText) {
				me._popup_frame.ggUpdateText=function() {
					var hs="<iframe src=\""+me.ggUserdata.author+"\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0px\" marginwidth=\"0px\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._popup_frame.ggUpdatePosition) {
				me._popup_frame.ggUpdatePosition();
			}
			me._popup_frame.ggTextDiv.scrollTop = 0;
		}
		me._gallery_ico_m.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				me._tooltip.ggText="B\u1ed9 S\u01b0u T\u1eadp \u1ea2nh";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="B\u1ed9 S\u01b0u T\u1eadp \u1ea2nh";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				me._tooltip.ggText="Gallery";
				me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
				if (me._tooltip.ggUpdateText) {
					me._tooltip.ggUpdateText=function() {
						var hs="Gallery";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (me._tooltip.ggUpdatePosition) {
					me._tooltip.ggUpdatePosition();
				}
				me._tooltip.ggTextDiv.scrollTop = 0;
			}
		}
		me._gallery_ico_m.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			me._tooltip.ggText="";
			me._tooltip.ggTextDiv.innerHTML=me._tooltip.ggText;
			if (me._tooltip.ggUpdateText) {
				me._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._tooltip.ggUpdatePosition) {
				me._tooltip.ggUpdatePosition();
			}
			me._tooltip.ggTextDiv.scrollTop = 0;
		}
		me._gallery_ico_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._gallery_pad_m.appendChild(me._gallery_ico_m);
		me._controler_m.appendChild(me._gallery_pad_m);
		me.divSkin.appendChild(me._controler_m);
		el=me._next_area=document.createElement('div');
		el.ggId="next_area";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : calc(50%  -  24px);';
		hs+='height : 72px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 220px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._next_area.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._next_area.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._next_area.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._next_area.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._next_area.style[domTransition]='right 0s, bottom 0s, ' + cssPrefix + 'transform 0s';
				if (me._next_area.ggCurrentLogicStatePosition == 0) {
					me._next_area.style.right='5px';
					me._next_area.style.bottom='5px';
				}
				else {
					me._next_area.style.right='5px';
					me._next_area.style.bottom='calc(50%  -  24px)';
				}
			}
		}
		me._next_area.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._next_area.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._next_area.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._next_area.style[domTransition]='right 0s, bottom 0s, ' + cssPrefix + 'transform 0s';
				if (me._next_area.ggCurrentLogicStateScaling == 0) {
					me._next_area.ggParameter.sx = 0.8;
					me._next_area.ggParameter.sy = 0.8;
					me._next_area.style[domTransform]=parameterToTransform(me._next_area.ggParameter);
				}
				else {
					me._next_area.ggParameter.sx = 1;
					me._next_area.ggParameter.sy = 1;
					me._next_area.style[domTransform]=parameterToTransform(me._next_area.ggParameter);
				}
			}
		}
		me._next_area.ggUpdatePosition=function (useTransition) {
		}
		el=me._cloner_next_area=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 220;
		el.ggHeight = 72;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._cloner_next_area.callChildLogicBlocks_sizechanged = function(){
			if(me._cloner_next_area.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_next_area.ggInstances.length; i++) {
					if (me._cloner_next_area.ggInstances[i]._bg_tt_next_area && me._cloner_next_area.ggInstances[i]._bg_tt_next_area.logicBlock_alpha) {
						me._cloner_next_area.ggInstances[i]._bg_tt_next_area.logicBlock_alpha();
					}
					if (me._cloner_next_area.ggInstances[i]._tt_next_area && me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_alpha) {
						me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_alpha();
					}
				}
			}
		}
		me._cloner_next_area.callChildLogicBlocks_changenode = function(){
			if(me._cloner_next_area.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_next_area.ggInstances.length; i++) {
					if (me._cloner_next_area.ggInstances[i]._tt_next_area && me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text) {
						me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text();
					}
				}
			}
		}
		me._cloner_next_area.callChildLogicBlocks_configloaded = function(){
			if(me._cloner_next_area.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_next_area.ggInstances.length; i++) {
					if (me._cloner_next_area.ggInstances[i]._bg_tt_next_area && me._cloner_next_area.ggInstances[i]._bg_tt_next_area.logicBlock_alpha) {
						me._cloner_next_area.ggInstances[i]._bg_tt_next_area.logicBlock_alpha();
					}
					if (me._cloner_next_area.ggInstances[i]._tt_next_area && me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_alpha) {
						me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_alpha();
					}
					if (me._cloner_next_area.ggInstances[i]._tt_next_area && me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text) {
						me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text();
					}
				}
			}
		}
		me._cloner_next_area.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._cloner_next_area.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_next_area.ggInstances.length; i++) {
					if (me._cloner_next_area.ggInstances[i]._tt_next_area && me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text) {
						me._cloner_next_area.ggInstances[i]._tt_next_area.logicBlock_text();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._cloner_next_area.ggUpdating == true) return;
			me._cloner_next_area.ggUpdating = true;
			var el=me._cloner_next_area;
			var curNumCols = 0;
			curNumCols = me._cloner_next_area.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._cloner_next_area.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._cloner_next_area.ggHeight) + 'px';
				parameter.left=(column * me._cloner_next_area.ggWidth) + 'px';
				parameter.width=me._cloner_next_area.ggWidth + 'px';
				parameter.height=me._cloner_next_area.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_cloner_next_area_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._cloner_next_area.callChildLogicBlocks_sizechanged();
			me._cloner_next_area.callChildLogicBlocks_changenode();
			me._cloner_next_area.callChildLogicBlocks_configloaded();
			me._cloner_next_area.callChildLogicBlocks_activehotspotchanged();
			me._cloner_next_area.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._cloner_next_area.parentNode.classList.contains('ggskin_subelement') && me._cloner_next_area.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._cloner_next_area.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "_nop_";
		el.ggId="Cloner_next_area";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 72px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._cloner_next_area.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._cloner_next_area.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._cloner_next_area.childNodes.length; i++) {
				var child=me._cloner_next_area.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._cloner_next_area.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.ggHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
				me._cloner_next_area.ggUpdate();
		}
		me._cloner_next_area.ggNodeChange=function () {
			me._cloner_next_area.ggUpdateConditionNodeChange();
		}
		me._next_area.appendChild(me._cloner_next_area);
		me.divSkin.appendChild(me._next_area);
		el=me._tt_area_button=document.createElement('div');
		els=me._tt_area_button__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_area_button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text test_tt";
		el.ggType='text';
		hs ='';
		hs+='bottom : 5px;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 275px;';
		hs+='pointer-events:auto;';
		hs+='border-top: 5px solid #ffffff; text-shadow: 0px 1px 1px #000000; box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12) ;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 275px;';
		hs+='height: 50px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+="display: flex; align-items: center; padding: 5px 30px 5px 10px;";
		els.setAttribute('style',hs);
		me._tt_area_button.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_area_button.ggUpdateText();
		player.addListener('changenode', function() {
			me._tt_area_button.ggUpdateText();
		});
		el.appendChild(els);
		me._tt_area_button.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._tt_area_button.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_area_button.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_area_button.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_area_button.style[domTransition]='';
				if (me._tt_area_button.ggCurrentLogicStateVisible == 0) {
					me._tt_area_button.style.visibility=(Number(me._tt_area_button.style.opacity)>0||!me._tt_area_button.style.opacity)?'inherit':'hidden';
					me._tt_area_button.ggVisible=true;
				}
				else {
					me._tt_area_button.style.visibility="hidden";
					me._tt_area_button.ggVisible=false;
				}
			}
		}
		me._tt_area_button.onclick=function (e) {
			player.setVariableValue('show_menu_thumb', true);
		}
		me._tt_area_button.ggUpdatePosition=function (useTransition) {
		}
		el=me._show_up_ico=document.createElement('div');
		els=me._show_up_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMS42LDM4LjQsMjkuNywyMS4zYTQuMiw0LjIsMCwwLDEsNC4zLDBMNjIuNCwzOC42YTEuNiwxLjYsMCwwLDEsLjYsMi4zbC0uMy41Yy0uNS44LTEuNCwyLjItMi4yLDEuN0wzNC4yLDI3LjZhNC4zLDQuMywwLDAsMC00LjQsMEw0LjIsNDMuMmMtLjguNC0xLjgtLjgtMi4zLTEuNGwtLjctLjlBMS42LDEuNiwwLDAsMSwxLjYsMzguNFoiLz4KPC9zdmc+Cg==';
		me._show_up_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="show_up_ico";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._show_up_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._show_up_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._tt_area_button.appendChild(me._show_up_ico);
		me.divSkin.appendChild(me._tt_area_button);
		el=me._scrollarea=document.createElement('div');
		els=me._scrollarea__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 59px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 220px;';
		hs+="";
		els.setAttribute('style',hs);
		me._scrollarea.ggScrollByX = function(diffX) {
			if(!me._scrollarea.ggHorScrollVisible || diffX == 0 || me._scrollarea.ggHPercentVisible >= 1.0) return;
			me._scrollarea.ggScrollPosX = (me._scrollarea__horScrollFg.offsetLeft + diffX);
			me._scrollarea.ggScrollPosX = Math.max(me._scrollarea.ggScrollPosX, 0);
			me._scrollarea.ggScrollPosX = Math.min(me._scrollarea.ggScrollPosX, me._scrollarea__horScrollBg.offsetWidth - me._scrollarea__horScrollFg.offsetWidth);
			me._scrollarea__horScrollFg.style.left = me._scrollarea.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea.ggScrollPosX / (me._scrollarea__horScrollBg.offsetWidth - me._scrollarea__horScrollFg.offsetWidth);
			me._scrollarea__content.style.left = -(Math.round((me._scrollarea.ggContentWidth * (1.0 - me._scrollarea.ggHPercentVisible)) * percentScrolled)) + me._scrollarea.ggContentLeftOffset + 'px';
			me._scrollarea.ggScrollPosXPercent = (me._scrollarea__horScrollFg.offsetLeft / me._scrollarea__horScrollBg.offsetWidth);
		}
		me._scrollarea.ggScrollByXSmooth = function(diffX) {
			if(!me._scrollarea.ggHorScrollVisible || diffX == 0 || me._scrollarea.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._scrollarea.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._scrollarea.ggScrollPosX >= me._scrollarea__horScrollBg.offsetWidth - me._scrollarea__horScrollFg.offsetWidth)) {
					me._scrollarea.ggScrollPosX = Math.min(me._scrollarea.ggScrollPosX, me._scrollarea__horScrollBg.offsetWidth - me._scrollarea__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._scrollarea.ggScrollPosX <= 0)) {
					me._scrollarea.ggScrollPosX = Math.max(me._scrollarea.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._scrollarea__horScrollFg.style.left = me._scrollarea.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea.ggScrollPosX / (me._scrollarea__horScrollBg.offsetWidth - me._scrollarea__horScrollFg.offsetWidth);
			me._scrollarea__content.style.left = -(Math.round((me._scrollarea.ggContentWidth * (1.0 - me._scrollarea.ggHPercentVisible)) * percentScrolled)) + me._scrollarea.ggContentLeftOffset + 'px';
			me._scrollarea.ggScrollPosXPercent = (me._scrollarea__horScrollFg.offsetLeft / me._scrollarea__horScrollBg.offsetWidth);
			}, 10);
		}
		me._scrollarea.ggScrollByY = function(diffY) {
			if(!me._scrollarea.ggVertScrollVisible || diffY == 0 || me._scrollarea.ggVPercentVisible >= 1.0) return;
			me._scrollarea.ggScrollPosY = (me._scrollarea__vertScrollFg.offsetTop + diffY);
			me._scrollarea.ggScrollPosY = Math.max(me._scrollarea.ggScrollPosY, 0);
			me._scrollarea.ggScrollPosY = Math.min(me._scrollarea.ggScrollPosY, me._scrollarea__vertScrollBg.offsetHeight - me._scrollarea__vertScrollFg.offsetHeight);
			me._scrollarea__vertScrollFg.style.top = me._scrollarea.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea.ggScrollPosY / (me._scrollarea__vertScrollBg.offsetHeight - me._scrollarea__vertScrollFg.offsetHeight);
			me._scrollarea__content.style.top = -(Math.round((me._scrollarea.ggContentHeight * (1.0 - me._scrollarea.ggVPercentVisible)) * percentScrolled)) + me._scrollarea.ggContentTopOffset + 'px';
			me._scrollarea.ggScrollPosYPercent = (me._scrollarea__vertScrollFg.offsetTop / me._scrollarea__vertScrollBg.offsetHeight);
		}
		me._scrollarea.ggScrollByYSmooth = function(diffY) {
			if(!me._scrollarea.ggVertScrollVisible || diffY == 0 || me._scrollarea.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._scrollarea.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._scrollarea.ggScrollPosY >= me._scrollarea__vertScrollBg.offsetHeight - me._scrollarea__vertScrollFg.offsetHeight)) {
					me._scrollarea.ggScrollPosY = Math.min(me._scrollarea.ggScrollPosY, me._scrollarea__vertScrollBg.offsetHeight - me._scrollarea__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._scrollarea.ggScrollPosY <= 0)) {
					me._scrollarea.ggScrollPosY = Math.max(me._scrollarea.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._scrollarea__vertScrollFg.style.top = me._scrollarea.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea.ggScrollPosY / (me._scrollarea__vertScrollBg.offsetHeight - me._scrollarea__vertScrollFg.offsetHeight);
			me._scrollarea__content.style.top = -(Math.round((me._scrollarea.ggContentHeight * (1.0 - me._scrollarea.ggVPercentVisible)) * percentScrolled)) + me._scrollarea.ggContentTopOffset + 'px';
			me._scrollarea.ggScrollPosYPercent = (me._scrollarea__vertScrollFg.offsetTop / me._scrollarea__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._scrollarea.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._scrollarea.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._scrollarea.ggHPercentVisible);
					me._scrollarea.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._scrollarea.clientWidth - (me._scrollarea.ggVertScrollVisible ? 0 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._scrollarea.clientWidth - (me._scrollarea.ggVertScrollVisible ? 0 : 0))) * me._scrollarea.ggHPercentVisible);
					me._scrollarea.ggScrollByXSmooth(diffX);
				}
			}
			if (me._scrollarea.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._scrollarea.ggVPercentVisible);
					me._scrollarea.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._scrollarea.clientHeight - (me._scrollarea.ggHorScrollVisible ? 0 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._scrollarea.clientHeight - (me._scrollarea.ggHorScrollVisible ? 0 : 0))) * me._scrollarea.ggVPercentVisible);
					me._scrollarea.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._scrollarea.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._scrollarea.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._scrollarea__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea.ggDragInertiaX *= 0.65;
					me._scrollarea.ggDragInertiaY *= 0.65;
					me._scrollarea.ggScrollByX(me._scrollarea.ggDragInertiaX);
					me._scrollarea.ggScrollByY(me._scrollarea.ggDragInertiaY);
					if (Math.abs(me._scrollarea.ggDragInertiaX) < 1.0 && Math.abs(me._scrollarea.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._scrollarea__content.ontouchend = null;
				me._scrollarea__content.ontouchmove = null;
				me._scrollarea__content.onpointerup = null;
				me._scrollarea__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._scrollarea__content.onpointerup = me._scrollarea__content.ontouchend;
		}
			me._scrollarea__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._scrollarea.ggDragLastX) * me._scrollarea.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._scrollarea.ggDragLastY) * me._scrollarea.ggVPercentVisible;
				me._scrollarea.ggDragInertiaX = -diffX;
				me._scrollarea.ggDragInertiaY = -diffY;
				me._scrollarea.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._scrollarea.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scrollarea.ggScrollByX(-diffX);
				me._scrollarea.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._scrollarea__content.onpointermove = me._scrollarea__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		el.ggId="Scrollarea";
		el.ggDy=-40;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='height : 350px;';
		hs+='left : 20px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 225px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._scrollarea.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._scrollarea.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('show_menu_thumb') == false))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._scrollarea.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._scrollarea.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._scrollarea.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._scrollarea.ggCurrentLogicStatePosition == 0) {
					me._scrollarea.style.left='20px';
					this.ggDy = -50;
					me._scrollarea.ggUpdatePosition(true);
				}
				else {
					me._scrollarea.style.left='20px';
					me._scrollarea.ggDy=-40;
					me._scrollarea.ggUpdatePosition(true);
				}
			}
		}
		me._scrollarea.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._scrollarea.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._scrollarea.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._scrollarea.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._scrollarea.ggCurrentLogicStateVisible == 0) {
					me._scrollarea.style.visibility="hidden";
					me._scrollarea.ggVisible=false;
				}
				else {
					me._scrollarea.style.visibility=(Number(me._scrollarea.style.opacity)>0||!me._scrollarea.style.opacity)?'inherit':'hidden';
					me._scrollarea.ggVisible=true;
				}
			}
		}
		me._scrollarea.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('show_menu_thumb') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._scrollarea.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._scrollarea.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._scrollarea.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, opacity 1000ms ease 0ms';
				if (me._scrollarea.ggCurrentLogicStateAlpha == 0) {
					me._scrollarea.style.visibility=me._scrollarea.ggVisible?'inherit':'hidden';
					me._scrollarea.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._scrollarea.style.opacity == 0.0) { me._scrollarea.style.visibility="hidden"; } }, 1005);
					me._scrollarea.style.opacity=0;
				}
			}
		}
		me._scrollarea.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContentWidth = contentWidth;
				this.ggContentHeight = contentHeight;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if(horScrollWasVisible != me._scrollarea.ggHorScrollVisible || vertScrollWasVisible != me._scrollarea.ggVertScrollVisible) {
					me.updateSize(me._scrollarea);
					me._scrollarea.ggUpdatePosition();
				}
			}
		}
		el=me._cloner_area=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 220;
		el.ggHeight = 60;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._cloner_area.callChildLogicBlocks_active = function(){
			if(me._cloner_area.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_area.ggInstances.length; i++) {
					if (me._cloner_area.ggInstances[i]._tt_area_list && me._cloner_area.ggInstances[i]._tt_area_list.logicBlock_scaling) {
						me._cloner_area.ggInstances[i]._tt_area_list.logicBlock_scaling();
					}
					if (me._cloner_area.ggInstances[i]._tt_area_list && me._cloner_area.ggInstances[i]._tt_area_list.logicBlock_textcolor) {
						me._cloner_area.ggInstances[i]._tt_area_list.logicBlock_textcolor();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._cloner_area.ggUpdating == true) return;
			me._cloner_area.ggUpdating = true;
			var el=me._cloner_area;
			var curNumCols = 0;
			curNumCols = me._cloner_area.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._cloner_area.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._cloner_area.ggHeight) + 'px';
				parameter.left=(column * me._cloner_area.ggWidth) + 'px';
				parameter.width=me._cloner_area.ggWidth + 'px';
				parameter.height=me._cloner_area.ggHeight + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_cloner_area_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
			}
			me._cloner_area.callChildLogicBlocks_active();
			me._cloner_area.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._cloner_area.parentNode.classList.contains('ggskin_subelement') && me._cloner_area.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._cloner_area.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"pic",title: UI_text.title},
			];
		el.ggId="Cloner_area";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 60px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._cloner_area.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._cloner_area.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._cloner_area.childNodes.length; i++) {
				var child=me._cloner_area.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._cloner_area.ggUpdatePosition=function (useTransition) {
				me._cloner_area.ggUpdate();
		}
		me._cloner_area.ggNodeChange=function () {
			if (
				(
					((me.ggUserdata.source != "$(ctag)"))
				)
			) {
				me._cloner_next_area.ggText=me.ggUserdata.source;
				if (me._cloner_next_area.ggText=='') {
					me._cloner_next_area.ggUpdate([]);
				} else {
					me._cloner_next_area.ggUpdate(me._cloner_next_area.ggText.split(','));
				}
				skin.updateSize(skin.divSkin);
			}
			me._cloner_area.ggUpdateConditionNodeChange();
		}
		me._scrollarea__content.appendChild(me._cloner_area);
		me.divSkin.appendChild(me._scrollarea);
		el=me._click_drag=document.createElement('div');
		el.ggId="click_&_drag";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 220px;';
		hs+='top : 270px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._click_drag.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._click_drag.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._click_drag.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._click_drag.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._click_drag.style[domTransition]='';
				if (me._click_drag.ggCurrentLogicStateVisible == 0) {
					me._click_drag.style.visibility="hidden";
					me._click_drag.ggVisible=false;
				}
				else {
					me._click_drag.style.visibility=(Number(me._click_drag.style.opacity)>0||!me._click_drag.style.opacity)?'inherit':'hidden';
					me._click_drag.ggVisible=true;
				}
			}
		}
		me._click_drag.ggUpdatePosition=function (useTransition) {
		}
		el=me._hide_timer_1=document.createElement('div');
		el.ggTimestamp=0;
		el.ggLastIsActive=false;
		el.ggTimeout=5000;
		el.ggId="hide_timer_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_timer_1.ggIsActive=function() {
			return (me._hide_timer_1.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._hide_timer_1.ggTimestamp) / me._hide_timer_1.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hide_timer_1.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._hide_timer_1.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hide_timer_1.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hide_timer_1.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hide_timer_1.style[domTransition]='opacity 1000ms ease 0ms';
				if (me._hide_timer_1.ggCurrentLogicStateAlpha == 0) {
					me._hide_timer_1.style.visibility=me._hide_timer_1.ggVisible?'inherit':'hidden';
					me._hide_timer_1.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._hide_timer_1.style.opacity == 0.0) { me._hide_timer_1.style.visibility="hidden"; } }, 1005);
					me._hide_timer_1.style.opacity=0;
				}
			}
		}
		me._hide_timer_1.ggCurrentLogicStateAlpha = -1;
		me._hide_timer_1.ggUpdateConditionTimer=function () {
			me._hide_timer_1.logicBlock_alpha();
		}
		me._hide_timer_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._mouse_timer_1=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=1000;
		el.ggId="mouse_timer_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mouse_timer_1.ggIsActive=function() {
			return (me._mouse_timer_1.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._mouse_timer_1.ggTimestamp) / me._mouse_timer_1.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_timer_1.ggActivate=function () {
			if (player.transitionsDisabled) {
				me._mouse_timer_1.style[domTransition]='none';
			} else {
				me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._mouse_timer_1.ggParameter.rx=4;me._mouse_timer_1.ggParameter.ry=-4;
			me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
			if (player.transitionsDisabled) {
				me._mouse_timer_1.style[domTransition]='none';
			} else {
				me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._mouse_timer_1.ggParameter.a="0.0000";
			me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
		}
		me._mouse_timer_1.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._mouse_timer_1.style[domTransition]='none';
			} else {
				me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._mouse_timer_1.ggParameter.rx=-4;me._mouse_timer_1.ggParameter.ry=4;
			me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
			if (player.transitionsDisabled) {
				me._mouse_timer_1.style[domTransition]='none';
			} else {
				me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
			}
			me._mouse_timer_1.ggParameter.a="20.0000";
			me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
		}
		me._mouse_timer_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._mouse_black_1=document.createElement('div');
		els=me._mouse_black_1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheW'+
			'VyXzEiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB5PSIwcHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDBweCIgdmVyc2lvbj0iMS4xIj4KIDxnIGlkPSJMYXllcl82Ij4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utb3BhY2l0eT0iMSIgZD0iTTg4LjYwNywzMi4yNDImI3hkOyYjeGE7JiN4OTsmI3g5O0M3OS45MTgsMTkuMTAyLDY3Ljg5Nyw3LjI1LDUyLjMzNiw3LjYxNkMzNC42MjQsOC4wMzMsMTcu'+
			'NTQsMTUuMTY4LTAuMTk4LDE0LjU5MyIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfMV8iPgogIDxsaW5lYXJHcmFkaWVudCB5Mj0iLTMwMS4yNzI0IiB4Mj0iMzEzLjYwMzEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgLTE5Ny41IC0xMjApIiB5MT0iLTE1Ni41MTU2IiBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzUyLjM5MDYiPgogICA8c3RvcCBvZmZzZXQ9IjAuMjYzOCIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDsgc3RvcC1vcGFjaXR5OjEiLz4KICAgPHN0b3Agb2Zmc2V0PSIwLjY1NzkiIHN0eWxlPSJzdG9wLWNvbG9yOi'+
			'MwMDAwMDA7IHN0b3Atb3BhY2l0eToxIi8+CiAgIDxzdG9wIG9mZnNldD0iMC43OTk5IiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwOyBzdG9wLW9wYWNpdHk6MSIvPgogICA8c3RvcCBvZmZzZXQ9IjAuOTAwNyIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDsgc3RvcC1vcGFjaXR5OjEiLz4KICAgPHN0b3Agb2Zmc2V0PSIwLjk4MiIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDsgc3RvcC1vcGFjaXR5OjEiLz4KICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwOyBzdG9wLW9wYWNpdHk6MSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHBhdGggc3Ryb2tlPSIj'+
			'MDAwMDAwIiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utb3BhY2l0eT0iMSIgZD0iTTE3Ny4zNDIsODYuMDE5JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMjQuNjQzLDQ1LjA3OSwyNS44ODUsOTEuODYyLDIuNzczLDEwNC40OTdjLTIzLjEwOSwxMi42MzMtNjEuODIxLTEzLjY2OC04Ni40NjQtNTguNzQ2JiN4ZDsmI3hhOyYjeDk7JiN4OTtDNjkuMDA5LDg2LjY5Miw2Ny43NjcsMzkuOTA3LDkwLjg3NywyNy4yNzNDMTEzLjk4NiwxNC42MzksMTUyLjY5OSw0MC45NDEsMTc3LjM0Miw4Ni4wMTl6Ii8+CiAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPS'+
			'Jub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1vcGFjaXR5PSIxIiBkPSJNMTYxLjEwMiw2MS4zNzZjMCwwLTEuNzYxLDE5LjMwNi0yOC44NDcsMzcuNzM0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTI3LjA4NywxOC40MjgtNDguOTIxLDE0LjU1Mi00OC45MjEsMTQuNTUyIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMyI+CiAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1vcGFjaXR5PSIxIiBkPSJNMTQ2LjA3LDg3LjY4OWMwLDAtOC4wNjMtMjAuMi0yMi4wMDItMzMuMzUyJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTEz'+
			'Ljk0MS0xMy4xNS0zNy4yNTQtMjQuMjkxLTM3LjI1NC0yNC4yOTEiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl80Ij4KICA8cGF0aCBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZmlsbC1vcGFjaXR5PSIxIiBzdHJva2Utb3BhY2l0eT0iMSIgZD0iTTE0NS41LDgzLjM0OWMtMy4xMjksMS44NC04LjktNS43MjItMTYuNjg0LTE1LjM2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy03Ljc4My05LjYzOS0xMy43NzEtMTcuODE2LTExLjUwMi0xOS41NDVjMi4yNzItMS43MjksOC45MDEsNS43MjEsMTYuNjg2LDE1LjM1OUMxNDEuNzgzLDczLjQ0MiwxNDguNj'+
			'MsODEuNTA3LDE0NS41LDgzLjM0OXoiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIi8+CiA8ZyBkaXNwbGF5PSJub25lIiBpZD0iTGF5ZXJfMl8xXyIvPgogPGcgaWQ9IkxheWVyXzUiPgogIDxwYXRoIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIxIiBkPSJNMTIyLjAzNCw1NC4zMjJjMCwwLDYuNS0xLjE5MywxMi44MjksNy41NjMmI3hkOyYjeGE7JiN4OTsmI3g5O2M2LjMyNiw4Ljc1Miw3LjI2MywxOC4wMjksNy4yNjMsMTguMDI5bC0yMC4yMDMtMjYuNjE2'+
			'bDEuMDU2LTAuOTgzYzAsMCw2LjQ5Ni0xLjE5MywxMi44MjgsNy41NiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzYuMzI1LDguNzUzLDcuMjY0LDE4LjAzMiw3LjI2NCwxOC4wMzJsLTAuMjgxLDIuMDU3Ii8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfNyIvPgo8L3N2Zz4K';
		me._mouse_black_1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mouse_black_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mouse_black_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_black_1.ggUpdatePosition=function (useTransition) {
		}
		me._mouse_timer_1.appendChild(me._mouse_black_1);
		el=me._mouse_white_1=document.createElement('div');
		els=me._mouse_white_1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwIDIwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheW'+
			'VyXzEiIHk9IjBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDBweCIgdmVyc2lvbj0iMS4xIj4KIDxnIGlkPSJMYXllcl82Ij4KICA8cGF0aCBzdHJva2U9IiNGRkZGRkYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNODguNjA3LDMyLjI0MiYjeGQ7JiN4YTsmI3g5OyYjeDk7Qzc5LjkxOCwxOS4xMDIsNjcuODk3LDcuMjUsNTIuMzM2LDcuNjE2QzM0LjYyNCw4LjAzMywxNy41NCwxNS4xNjgtMC4xOTgsMTQu'+
			'NTkzIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMV8xXyI+CiAgPGxpbmVhckdyYWRpZW50IHgyPSIzMTMuNjAzMSIgeTI9Ii0zMDEuMjcyNCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAtMTk3LjUgLTEyMCkiIHkxPSItMTU2LjUxNTYiIGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzNTIuMzkwNiI+CiAgIDxzdG9wIG9mZnNldD0iMC4yNjM4IiBzdHlsZT0ic3RvcC1jb2xvcjojRjZGNkY2Ii8+CiAgIDxzdG9wIG9mZnNldD0iMC42NTc5IiBzdHlsZT0ic3RvcC1jb2xvcjojRjRGNEY0Ii8+CiAgIDxzdG9wIG9mZnNldD0iMC43OTk5Ii'+
			'BzdHlsZT0ic3RvcC1jb2xvcjojRURFREVEIi8+CiAgIDxzdG9wIG9mZnNldD0iMC45MDA3IiBzdHlsZT0ic3RvcC1jb2xvcjojRTJFMkUyIi8+CiAgIDxzdG9wIG9mZnNldD0iMC45ODIiIHN0eWxlPSJzdG9wLWNvbG9yOiNEMUQxRDEiLz4KICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0NDQ0NDIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cGF0aCBzdHJva2U9IiNDQ0NDQ0MiIGZpbGw9InVybCgjU1ZHSURfMV8pIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNzcuMzQyLDg2LjAxOSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzI0LjY0Myw0NS4wNzksMjUuODg1LDkx'+
			'Ljg2MiwyLjc3MywxMDQuNDk3Yy0yMy4xMDksMTIuNjMzLTYxLjgyMS0xMy42NjgtODYuNDY0LTU4Ljc0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7QzY5LjAwOSw4Ni42OTIsNjcuNzY3LDM5LjkwNyw5MC44NzcsMjcuMjczQzExMy45ODYsMTQuNjM5LDE1Mi42OTksNDAuOTQxLDE3Ny4zNDIsODYuMDE5eiIvPgogIDxwYXRoIHN0cm9rZT0iI0NDQ0NDQyIgZmlsbD0ibm9uZSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTYxLjEwMiw2MS4zNzZjMCwwLTEuNzYxLDE5LjMwNi0yOC44NDcsMzcuNzM0JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTI3LjA4NywxOC40MjgtNDguOTIxLDE0LjU1Mi00OC45Mj'+
			'EsMTQuNTUyIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMyI+CiAgPHBhdGggc3Ryb2tlPSIjQ0NDQ0NDIiBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNDYuMDcsODcuNjg5YzAsMC04LjA2My0yMC4yLTIyLjAwMi0zMy4zNTImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMTMuOTQxLTEzLjE1LTM3LjI1NC0yNC4yOTEtMzcuMjU0LTI0LjI5MSIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzQiPgogIDxwYXRoIHN0cm9rZT0iI0NDQ0NDQyIgZmlsbD0iIzRENEQ0RCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTQ1LjUsODMuMzQ5Yy0zLjEyOSwxLjg0LTguOS01LjcyMi0xNi42'+
			'ODQtMTUuMzYxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTcuNzgzLTkuNjM5LTEzLjc3MS0xNy44MTYtMTEuNTAyLTE5LjU0NWMyLjI3Mi0xLjcyOSw4LjkwMSw1LjcyMSwxNi42ODYsMTUuMzU5QzE0MS43ODMsNzMuNDQyLDE0OC42Myw4MS41MDcsMTQ1LjUsODMuMzQ5eiIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzIiLz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yXzFfIi8+CiA8ZyBpZD0iTGF5ZXJfNSI+CiAgPHBhdGggc3Ryb2tlPSIjOTk5OTk5IiBmaWxsPSIjRTZFNkU2IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xMjIuMDM0LDU0LjMyMmMwLDAsNi'+
			'41LTEuMTkzLDEyLjgyOSw3LjU2MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzYuMzI2LDguNzUyLDcuMjYzLDE4LjAyOSw3LjI2MywxOC4wMjlsLTIwLjIwMy0yNi42MTZsMS4wNTYtMC45ODNjMCwwLDYuNDk2LTEuMTkzLDEyLjgyOCw3LjU2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjNi4zMjUsOC43NTMsNy4yNjQsMTguMDMyLDcuMjY0LDE4LjAzMmwtMC4yODEsMi4wNTciLz4KIDwvZz4KIDxnIGlkPSJMYXllcl83Ii8+Cjwvc3ZnPgo=';
		me._mouse_white_1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mouse_white_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mouse_white_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_white_1.ggUpdatePosition=function (useTransition) {
		}
		me._mouse_timer_1.appendChild(me._mouse_white_1);
		me._hide_timer_1.appendChild(me._mouse_timer_1);
		el=me._mouse_text_white_1=document.createElement('div');
		els=me._mouse_text_white_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="mouse_text_white_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -12px;';
		hs+='position : absolute;';
		hs+='top : 80px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 500px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style', hs);
		if (UI_text.english)// di chuột để hiển thị danh sách các vị trí
		{
			els.innerHTML = UI_text.EN.tips1;
		} else
		{
			els.innerHTML = UI_text.VN.tips1;
		}
		el.appendChild(els);
		me._mouse_text_white_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_text_white_1.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hide_timer_1.appendChild(me._mouse_text_white_1);
		me._click_drag.appendChild(me._hide_timer_1);
		me.divSkin.appendChild(me._click_drag);
		el=me._container_logo=document.createElement('div');
		el.ggId="Container_logo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : 20px;';
		hs+='position : absolute;';
		hs+='top : 20px;';
		hs+='visibility : inherit;';
		hs+='width : 114px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._container_logo.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_logo.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._container_logo.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._container_logo.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._container_logo.style[domTransition]='left 0s, top 0s, ' + cssPrefix + 'transform 0s';
				if (me._container_logo.ggCurrentLogicStatePosition == 0) {
					me._container_logo.style.left='10px';
					me._container_logo.style.top='5px';
				}
				else {
					me._container_logo.style.left='20px';
					me._container_logo.style.top='20px';
				}
			}
		}
		me._container_logo.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._container_logo.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._container_logo.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._container_logo.style[domTransition]='left 0s, top 0s, ' + cssPrefix + 'transform 0s';
				if (me._container_logo.ggCurrentLogicStateScaling == 0) {
					me._container_logo.ggParameter.sx = 0.6;
					me._container_logo.ggParameter.sy = 0.6;
					me._container_logo.style[domTransform]=parameterToTransform(me._container_logo.ggParameter);
				}
				else {
					me._container_logo.ggParameter.sx = 1;
					me._container_logo.ggParameter.sy = 1;
					me._container_logo.style[domTransform]=parameterToTransform(me._container_logo.ggParameter);
				}
			}
		}
		me._container_logo.onclick=function (e) {
			player.openUrl("https:\/\/medlatec.vn\/","");
		}
		me._container_logo.ggUpdatePosition=function (useTransition) {
		}
		el=me._logo=document.createElement('div');
		els=me._logo__img=document.createElement('img');
		els.className = 'ggskin ggskin_svg';
		if (UI_text.english)
		{
			me._logo__img.setAttribute('src', basePath + 'images/logoEN.png');
		} else
		{
			me._logo__img.setAttribute('src', basePath + 'images/logo.svg');
		}
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="logo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 114px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._logo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._logo.ggUpdatePosition=function (useTransition) {
		}
		me._container_logo.appendChild(me._logo);
		me.divSkin.appendChild(me._container_logo);
		el=me._map_ico=document.createElement('div');
		els=me._map_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0ibWFwIj4KICA8cmVjdCBoZWlnaHQ9IjY0IiBmaWxsPSIjMDEwMTAxIiB3aWR0aD0iNjQiIGZpbGwtb3BhY2l0eT0iMC41ODgyMzUiLz4KICA8cG9seWdvbiBmaWxsPSIjMjhhMmM2IiBwb2ludHM9IjQuNiAzMC45IDIzLjIgNTguMiAzMC43IDQ5LjIgMTEuOSAyNS45IDQuNiAzMC45Ii8+CiAgPHBhdGggZmlsbD0iIzI4YTJjNiIgZD0iTTEzLjUsMjUuOGwxOCwyMi41LDE1LTUuOS05LjgtOS0yLjgsM2EyLjQsMi40LD'+
			'AsMCwxLTEuNi43SDMyYTMuMywzLjMsMCwwLDEtMi4zLTFMMjAuNCwyNS42Ii8+CiAgPHBvbHlsaW5lIGZpbGw9IiMyOGEyYzYiIHBvaW50cz0iMzcuNCAzMi42IDQ3LjggNDEuNyA1OC44IDMzLjEgNDMuNSAyNS4yIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ0LDI0LjJsLS41LDEsNy42LDMuOSw3LjcsNGMwLC4xLTUuNiw0LjUtMTAuNCw4LjFsLS42LjUtNS4yLTQuNS01LjItNC42LS4zLjNjLS4yLjItLjQuNC0uNC41czIuMywyLjEsNSw0LjUsNC45LDQuNCw0LjgsNC41LTE1LDYtMTUsNS45LTQuMS01LjEtOS4xLTExLjJMMTMuNSwyNS44aDYuOWwtLjctMS0uNi0xLjFIMTEuMkw2Ljcs'+
			'MjYuOEMyLDMwLDEuOCwzMC4xLDIsMzAuOFMyMi4zLDYwLjksMjIuNyw2MS4xcy45LjEsMS41LS41bDQuNC01LjQsMy45LTQuOSw4LTMuMiw4LTMuMSw2LjItNC44TDYxLjQsMzRjLjYtLjYuOC0xLC42LTEuNXMtLjYtLjYtMTEuMy02bC02LjEtMy4yWk0yMC45LDM3YzQuOCw2LjEsOSwxMS4zLDkuMywxMS42bC41LjZMMjcsNTMuN2MtMiwyLjQtMy43LDQuNS0zLjgsNC41TDQuOCwzMS4ybC0uMi0uMywzLjYtMi41LDMuNy0yLjVaIi8+CiAgPHBhdGggZmlsbD0iI2VkMjAyNCIgZD0iTTI5LjksMi45YTEyLjcsMTIuNywwLDAsMC03LjIsMy44QTEyLjUsMTIuNSwwLDAsMCwxOSwxNS44YzAsMy44LD'+
			'EuMyw3LDQuOCwxMS4xLDEuMywxLjUsNS42LDYuNCw3LjIsOC4xbDEsMSwxLjktMi4yYzMuMi0zLjcsNi42LTcuOCw3LjUtOWExOC44LDE4LjgsMCwwLDAsMy40LTcsNy41LDcuNSwwLDAsMCwuMi0yLjIsMTIuMywxMi4zLDAsMCwwLTMuOS05LjEsMTIuNiwxMi42LDAsMCwwLTYuOC0zLjZBMTYuMiwxNi4yLDAsMCwwLDI5LjksMi45Wm0zLjQsNi45YTYuNiw2LjYsMCwwLDEsNSw0LjgsNi40LDYuNCwwLDAsMS05LDcuMiw2LjMsNi4zLDAsMCwxLTEuOC0xMC4zQTYuMSw2LjEsMCwwLDEsMzMuMyw5LjhaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._map_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._map_ico__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0ibWFwIj4KICA8cmVjdCBoZWlnaHQ9IjY0IiBmaWxsPSIjMDEwMTAxIiB3aWR0aD0iNjQiLz4KICA8cG9seWdvbiBmaWxsPSIjMjhhMmM2IiBwb2ludHM9IjQuNiAzMC45IDIzLjIgNTguMiAzMC43IDQ5LjIgMTEuOSAyNS45IDQuNiAzMC45Ii8+CiAgPHBhdGggZmlsbD0iIzI4YTJjNiIgZD0iTTEzLjUsMjUuOGwxOCwyMi41LDE1LTUuOS05LjgtOS0yLjgsM2EyLjQsMi40LDAsMCwxLTEuNi43SDMyYTMuMywzLjMsMC'+
			'wwLDEtMi4zLTFMMjAuNCwyNS42Ii8+CiAgPHBvbHlsaW5lIGZpbGw9IiMyOGEyYzYiIHBvaW50cz0iMzcuNCAzMi42IDQ3LjggNDEuNyA1OC44IDMzLjEgNDMuNSAyNS4yIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQ0LDI0LjJsLS41LDEsNy42LDMuOSw3LjcsNGMwLC4xLTUuNiw0LjUtMTAuNCw4LjFsLS42LjUtNS4yLTQuNS01LjItNC42LS4zLjNjLS4yLjItLjQuNC0uNC41czIuMywyLjEsNSw0LjUsNC45LDQuNCw0LjgsNC41LTE1LDYtMTUsNS45LTQuMS01LjEtOS4xLTExLjJMMTMuNSwyNS44aDYuOWwtLjctMS0uNi0xLjFIMTEuMkw2LjcsMjYuOEMyLDMwLDEuOCwzMC4xLDIsMzAu'+
			'OFMyMi4zLDYwLjksMjIuNyw2MS4xcy45LjEsMS41LS41bDQuNC01LjQsMy45LTQuOSw4LTMuMiw4LTMuMSw2LjItNC44TDYxLjQsMzRjLjYtLjYuOC0xLC42LTEuNXMtLjYtLjYtMTEuMy02bC02LjEtMy4yWk0yMC45LDM3YzQuOCw2LjEsOSwxMS4zLDkuMywxMS42bC41LjZMMjcsNTMuN2MtMiwyLjQtMy43LDQuNS0zLjgsNC41TDQuOCwzMS4ybC0uMi0uMywzLjYtMi41LDMuNy0yLjVaIi8+CiAgPHBhdGggZmlsbD0iI2VkMjAyNCIgZD0iTTI5LjksMi45YTEyLjcsMTIuNywwLDAsMC03LjIsMy44QTEyLjUsMTIuNSwwLDAsMCwxOSwxNS44YzAsMy44LDEuMyw3LDQuOCwxMS4xLDEuMywxLjUsNS'+
			'42LDYuNCw3LjIsOC4xbDEsMSwxLjktMi4yYzMuMi0zLjcsNi42LTcuOCw3LjUtOWExOC44LDE4LjgsMCwwLDAsMy40LTcsNy41LDcuNSwwLDAsMCwuMi0yLjIsMTIuMywxMi4zLDAsMCwwLTMuOS05LjEsMTIuNiwxMi42LDAsMCwwLTYuOC0zLjZBMTYuMiwxNi4yLDAsMCwwLDI5LjksMi45Wm0zLjQsNi45YTYuNiw2LjYsMCwwLDEsNSw0LjgsNi40LDYuNCwwLDAsMS05LDcuMiw2LjMsNi4zLDAsMCwxLTEuOC0xMC4zQTYuMSw2LjEsMCwwLDEsMzMuMyw5LjhaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._map_ico__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="Map_ico";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 70px;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_ico.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_ico.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('map_hide') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_ico.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_ico.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_ico.style[domTransition]='opacity 200ms ease 0ms';
				if (me._map_ico.ggCurrentLogicStateAlpha == 0) {
					me._map_ico.style.visibility=me._map_ico.ggVisible?'inherit':'hidden';
					me._map_ico.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_ico.style.opacity == 0.0) { me._map_ico.style.visibility="hidden"; } }, 205);
					me._map_ico.style.opacity=0;
				}
			}
		}
		me._map_ico.onclick=function (e) {
			player.setVariableValue('map_hide', false);
			if (
				(
					((player.getIsMobile() == true))
				)
			) {
				player.setVariableValue('map_scale_full', true);
			}
		}
		me._map_ico.onmouseover=function (e) {
			me._map_ico__img.style.visibility='hidden';
			me._map_ico__imgo.style.visibility='inherit';
		}
		me._map_ico.onmouseout=function (e) {
			me._map_ico__img.style.visibility='inherit';
			me._map_ico__imgo.style.visibility='hidden';
		}
		me._map_ico.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._map_ico);
		el=me._next_node=document.createElement('div');
		el.ggId="next_node";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 10px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 270px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._next_node.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._next_node.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._next_node.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._next_node.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._next_node.style[domTransition]='left 0s, bottom 0s';
				if (me._next_node.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._next_node.style.bottom='70px';
					me._next_node.ggUpdatePosition(true);
				}
				else {
					me._next_node.ggDx=0;
					me._next_node.style.bottom='10px';
					me._next_node.ggUpdatePosition(true);
				}
			}
		}
		me._next_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._next_node.ggNodeChange=function () {
			if (
				(
					((player.getCurrentNode() == "node90"))
				)
			) {
				player.setVariableValue('var_intro', true);
			}
				player.playSound("Element01","1");
		}
		el=me._next=document.createElement('div');
		els=me._next__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="next";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 104px;';
		hs+='height: 39px;';
		hs+='background: #253d8f;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 8px 7px 8px 7px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style', hs);
		if (UI_text.english)// kế tiếp
		{
			els.innerHTML = UI_text.EN.play_next;
		} else
		{
			els.innerHTML = UI_text.VN.play_next;
		}
		el.appendChild(els);
		me._next.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._next.onclick=function (e) {
			player.openNext("{"+player.getNextNode()+"}","");
		}
		me._next.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._icon_next=document.createElement('div');
		els=me._icon_next__img=document.createElement('img');
		els.className='ggskin ggskin_icon_next';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACOklEQVRYhe2XTY9MQRSG36JNi2bBnl8g+AFmgRUTzMZnJhHRLIylsSQSMQsLw29ggZUZ4iPxPeyQkBCSmR8gIZFBT0+Tx2LOjerbdW/XvU3GYs7ynPfc96mqW/dWSYuxwOEkCahIOixpUNJqSW8lXXLOvev2AKAq6ZikAUmrJL2SNOacm4oiAKrAfTqjAezt0rsSeBHonQF2xAKc8QxHgTowabmfwP6c3jHP8CxwFHhpuVlgIAZg2hqGvVwFuJ4HATjgi2kOevnlwJ1oCKBp4o2pfC4EUPOmfF2qFg8BfDDhSKCWhjiQqn+yWj3QGwcBjJioCewqAgGct/x3YGspCGApMF4Ggvkd9OhvQPQBN000BwxmgF7xIIYsvwJ44EFsy3h+7iD/G4gqcCtiOa'+
			'6ZpgX0W74GPC6wHA1gUy8QiWbSy9eAJxEQT00z0QFQAGK91X8BywpC9Fv965IgQVy4f9JbYAlum+aZly+6BONlzZNvwhywuaB58hL+wP/8074Nm2Rvw6umSW/Dh5551jacCA4uYL67B/PQyHPNK5nF8LS3sD+jLZm/97dkTPtd08ySPqgApyLMb6TNrTbak7mJPprgZBFzqye/4yOlzE2YHEg2FDT3DyRrS5mbeMqEJ2LNTeOAz6YZKmVuDadN3AAuAMf5c9JtAftyei+a7htwDhgGXkeb20P6gHt0RgPY06W3BjwP9M4A27uaq/1ickjzF5M1kt5Iuuycex8zAEl1STvVfjGZjgFYjAWP3x5X/jN72AtfAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="icon_next";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 30px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._icon_next.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._icon_next.ggUpdatePosition=function (useTransition) {
		}
		me._next.appendChild(me._icon_next);
		me._next_node.appendChild(me._next);
		el=me._auto_next_node=document.createElement('div');
		el.ggId="auto_next_node";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 0px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._auto_next_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._auto_next_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._stop_next_node=document.createElement('div');
		el.ggId="stop_next_node";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #253d8f;';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._stop_next_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._stop_next_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('play_nextnode') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._stop_next_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._stop_next_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._stop_next_node.style[domTransition]='';
				if (me._stop_next_node.ggCurrentLogicStateVisible == 0) {
					me._stop_next_node.style.visibility="hidden";
					me._stop_next_node.ggVisible=false;
				}
				else {
					me._stop_next_node.style.visibility=(Number(me._stop_next_node.style.opacity)>0||!me._stop_next_node.style.opacity)?'inherit':'hidden';
					me._stop_next_node.ggVisible=true;
				}
			}
		}
		me._stop_next_node.onclick=function (e) {
			player.setVariableValue('play_nextnode', false);
			player.stopAutorotate();
		}
		me._stop_next_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._pause=document.createElement('div');
		els=me._pause__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAxOCAyOSIgd2lkdGg9IjE4Ij4KIDxwYXRoIGZpbGw9IndoaXRlIiBkPSJNNi40NDczNCAyOC41NTA4SDAuMDQxOTkyMlYwLjQ1MDUxMkg2LjQ0NzM0VjI4LjU1MDhaIi8+CiA8cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTE3LjkyNjggMjguNTUwOEgxMS41MjE1VjAuNDUwNTEySDE3LjkyNjhWMjguNTUwOFoiLz4KPC9zdmc+Cg==';
		me._pause__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="pause";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pause.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._pause.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._stop_next_node.appendChild(me._pause);
		me._auto_next_node.appendChild(me._stop_next_node);
		el=me._play_next_node=document.createElement('div');
		el.ggId="play_next_node";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #253d8f;';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 45px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 45px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._play_next_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._play_next_node.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('play_nextnode') == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._play_next_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._play_next_node.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._play_next_node.style[domTransition]='';
				if (me._play_next_node.ggCurrentLogicStateVisible == 0) {
					me._play_next_node.style.visibility=(Number(me._play_next_node.style.opacity)>0||!me._play_next_node.style.opacity)?'inherit':'hidden';
					me._play_next_node.ggVisible=true;
				}
				else {
					me._play_next_node.style.visibility="hidden";
					me._play_next_node.ggVisible=false;
				}
			}
		}
		me._play_next_node.onclick=function (e) {
			player.setVariableValue('play_nextnode', true);
			player.startAutorotate("0.04","10");
		}
		me._play_next_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._play=document.createElement('div');
		els=me._play__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAxNiAyOCIgd2lkdGg9IjE2Ij4KIDxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMTUuNzY3IDEzLjcwMzRMMCAtMC4wMDA0MjkxNTNWMjcuNDA3MkwxNS43NjcgMTMuNzAzNFoiLz4KPC9zdmc+Cg==';
		me._play__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="play";
		el.ggDx=2;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._play.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._play.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._play_next_node.appendChild(me._play);
		me._auto_next_node.appendChild(me._play_next_node);
		me._next_node.appendChild(me._auto_next_node);
		el=me._prev=document.createElement('div');
		els=me._prev__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="prev";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 104px;';
		hs+='height: 39px;';
		hs+='background: #253d8f;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: right;';
		hs+='white-space: nowrap;';
		hs+='padding: 8px 7px 8px 7px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style', hs);
		if (UI_text.english)// quay lại
		{
			els.innerHTML = UI_text.EN.play_back;
		} else
		{
			els.innerHTML = UI_text.VN.play_back;
		}
		el.appendChild(els);
		me._prev.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._prev.onclick=function (e) {
			player.openNext("{"+player.getPrevNode()+"}","");
		}
		me._prev.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._icon_prev=document.createElement('div');
		els=me._icon_prev__img=document.createElement('img');
		els.className='ggskin ggskin_icon_prev';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACOklEQVRYhe2XTY9MQRSG36JNi2bBnl8g+AFmgRUTzMZnJhHRLIylsSQSMQsLw29ggZUZ4iPxPeyQkBCSmR8gIZFBT0+Tx2LOjerbdW/XvU3GYs7ynPfc96mqW/dWSYuxwOEkCahIOixpUNJqSW8lXXLOvev2AKAq6ZikAUmrJL2SNOacm4oiAKrAfTqjAezt0rsSeBHonQF2xAKc8QxHgTowabmfwP6c3jHP8CxwFHhpuVlgIAZg2hqGvVwFuJ4HATjgi2kOevnlwJ1oCKBp4o2pfC4EUPOmfF2qFg8BfDDhSKCWhjiQqn+yWj3QGwcBjJioCewqAgGct/x3YGspCGApMF4Ggvkd9OhvQPQBN000BwxmgF7xIIYsvwJ44EFsy3h+7iD/G4gqcCtiOa'+
			'6ZpgX0W74GPC6wHA1gUy8QiWbSy9eAJxEQT00z0QFQAGK91X8BywpC9Fv965IgQVy4f9JbYAlum+aZly+6BONlzZNvwhywuaB58hL+wP/8074Nm2Rvw6umSW/Dh5551jacCA4uYL67B/PQyHPNK5nF8LS3sD+jLZm/97dkTPtd08ySPqgApyLMb6TNrTbak7mJPprgZBFzqye/4yOlzE2YHEg2FDT3DyRrS5mbeMqEJ2LNTeOAz6YZKmVuDadN3AAuAMf5c9JtAftyei+a7htwDhgGXkeb20P6gHt0RgPY06W3BjwP9M4A27uaq/1ickjzF5M1kt5Iuuycex8zAEl1STvVfjGZjgFYjAWP3x5X/jN72AtfAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="icon_prev";
		el.ggParameter={ rx:0,ry:0,a:180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 30px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._icon_prev.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._icon_prev.ggUpdatePosition=function (useTransition) {
		}
		me._prev.appendChild(me._icon_prev);
		me._next_node.appendChild(me._prev);
		me.divSkin.appendChild(me._next_node);
		el=me._map_container=document.createElement('div');
		el.ggId="Map_container";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 140px;';
		hs+='height : 120px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_container.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_container.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('map_scale_full') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._map_container.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._map_container.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._map_container.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_container.ggCurrentLogicStatePosition == 0) {
					me._map_container.style.left='0px';
					me._map_container.style.bottom='40px';
				}
				else {
					me._map_container.style.left='0px';
					me._map_container.style.bottom='140px';
				}
			}
		}
		me._map_container.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getVariableValue('map_scale_normal') == true))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getVariableValue('map_scale_full') == true))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((player.getVariableValue('map_hide') == true))
			)
			{
				newLogicStateSize = 2;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._map_container.ggCurrentLogicStateSize != newLogicStateSize) {
				me._map_container.ggCurrentLogicStateSize = newLogicStateSize;
				me._map_container.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_container.ggCurrentLogicStateSize == 0) {
					me._map_container.style.width='615px';
					me._map_container.style.height='375px';
					setTimeout(function() {skin.updateSize(me._map_container);}, 500);
				}
				else if (me._map_container.ggCurrentLogicStateSize == 1) {
					me._map_container.style.width='100%';
					me._map_container.style.height='calc(100% - 40px)';
					setTimeout(function() {skin.updateSize(me._map_container);}, 500);
				}
				else if (me._map_container.ggCurrentLogicStateSize == 2) {
					me._map_container.style.width='32px';
					me._map_container.style.height='32px';
					setTimeout(function() {skin.updateSize(me._map_container);}, 500);
				}
				else {
					me._map_container.style.width='230px';
					me._map_container.style.height='120px';
					me._map_container.style.height='120px';
					setTimeout(function() {skin.updateSize(me._map_container);}, 500);
				}
			}
		}
		me._map_container.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('map_hide') == true)) || 
				((player.getVariableValue('show_menu_thumb') == true)) || 
				((player.getVariableValue('3D_space_open') == true)) || 
				((player.getVariableValue('open_popup') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_container.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_container.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_container.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_container.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._map_container.style.opacity == 0.0) { me._map_container.style.visibility="hidden"; } }, 505);
					me._map_container.style.opacity=0;
				}
				else {
					me._map_container.style.visibility=me._map_container.ggVisible?'inherit':'hidden';
					me._map_container.style.opacity=1;
				}
			}
		}
		me._map_container.onclick=function (e) {
			if (
				(
					((me.ggUserdata.tags.indexOf("sankt") != -1))
				)
			) {
			}
		}
		me._map_container.ggUpdatePosition=function (useTransition) {
		}
		me._map_container.ggNodeChange=function () {
			if (
				(
					((me.ggUserdata.tags.indexOf("fly") != -1))
				)
			) {
				player.setVariableValue('map_sel', Number("0"));
			}
			if (
				(
					((me.ggUserdata.tags.indexOf("Villa A3") != -1))
				)
			) {
				player.setVariableValue('map_sel', Number("1"));
			}
			if (
				(
					((me.ggUserdata.tags.indexOf("Villa A8") != -1))
				)
			) {
				player.setVariableValue('map_sel', Number("2"));
			}
			if (
				(
					((me.ggUserdata.tags.indexOf("Villa B1") != -1))
				)
			) {
				player.setVariableValue('map_sel', Number("3"));
			}
			if (
				(
					((me.ggUserdata.tags.indexOf("Villa C1") != -1))
				)
			) {
				player.setVariableValue('map_sel', Number("4"));
			}
		}
		el=me._map_01=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map_01";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+='z-index: 0;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_01.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_01.ggUpdateConditionResize=function () {
			if (me._map_01.ggMapNotLoaded == false) {
				me._map_01.ggMap.invalidateSize(false);
			}
		}
		me._map_01.ggUpdateConditionTimer=function () {
			me._map_01.ggRadar.update();
		}
		me._map_01.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			me._map_01.ggUpdateConditionResize();
		}
		me._map_01.ggNodeChange=function () {
			if (me._map_01.ggLastActivMarker) {
				if (me._map_01.ggLastActivMarker._div.ggDeactivate) me._map_01.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_01.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_01.ggLastActivMarker=marker;
			}
			if (!me._map_01.ggMapNotLoaded) {
				me._map_01.ggCenterNode();
			}
			if (player.getMapType(me._map_01.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_01.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_01.ggChangeMap(mapId);
					}
				}
			}
			me._map_01.ggLastNodeId = id;
		}
		me._map_container.appendChild(me._map_01);
		el=me._sel_floorplan_scroll=document.createElement('div');
		els=me._sel_floorplan_scroll__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 44px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 209px;';
		hs+="";
		els.setAttribute('style',hs);
		me._sel_floorplan_scroll.ggScrollByX = function(diffX) {
			if(!me._sel_floorplan_scroll.ggHorScrollVisible || diffX == 0 || me._sel_floorplan_scroll.ggHPercentVisible >= 1.0) return;
			me._sel_floorplan_scroll.ggScrollPosX = (me._sel_floorplan_scroll__horScrollFg.offsetLeft + diffX);
			me._sel_floorplan_scroll.ggScrollPosX = Math.max(me._sel_floorplan_scroll.ggScrollPosX, 0);
			me._sel_floorplan_scroll.ggScrollPosX = Math.min(me._sel_floorplan_scroll.ggScrollPosX, me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
			me._sel_floorplan_scroll__horScrollFg.style.left = me._sel_floorplan_scroll.ggScrollPosX + 'px';
			let percentScrolled = me._sel_floorplan_scroll.ggScrollPosX / (me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
			me._sel_floorplan_scroll__content.style.left = -(Math.round((me._sel_floorplan_scroll.ggContentWidth * (1.0 - me._sel_floorplan_scroll.ggHPercentVisible)) * percentScrolled)) + me._sel_floorplan_scroll.ggContentLeftOffset + 'px';
			me._sel_floorplan_scroll.ggScrollPosXPercent = (me._sel_floorplan_scroll__horScrollFg.offsetLeft / me._sel_floorplan_scroll__horScrollBg.offsetWidth);
		}
		me._sel_floorplan_scroll.ggScrollByXSmooth = function(diffX) {
			if(!me._sel_floorplan_scroll.ggHorScrollVisible || diffX == 0 || me._sel_floorplan_scroll.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._sel_floorplan_scroll.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._sel_floorplan_scroll.ggScrollPosX >= me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth)) {
					me._sel_floorplan_scroll.ggScrollPosX = Math.min(me._sel_floorplan_scroll.ggScrollPosX, me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._sel_floorplan_scroll.ggScrollPosX <= 0)) {
					me._sel_floorplan_scroll.ggScrollPosX = Math.max(me._sel_floorplan_scroll.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._sel_floorplan_scroll__horScrollFg.style.left = me._sel_floorplan_scroll.ggScrollPosX + 'px';
			let percentScrolled = me._sel_floorplan_scroll.ggScrollPosX / (me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
			me._sel_floorplan_scroll__content.style.left = -(Math.round((me._sel_floorplan_scroll.ggContentWidth * (1.0 - me._sel_floorplan_scroll.ggHPercentVisible)) * percentScrolled)) + me._sel_floorplan_scroll.ggContentLeftOffset + 'px';
			me._sel_floorplan_scroll.ggScrollPosXPercent = (me._sel_floorplan_scroll__horScrollFg.offsetLeft / me._sel_floorplan_scroll__horScrollBg.offsetWidth);
			}, 10);
		}
		me._sel_floorplan_scroll.ggScrollByY = function(diffY) {
			if(!me._sel_floorplan_scroll.ggVertScrollVisible || diffY == 0 || me._sel_floorplan_scroll.ggVPercentVisible >= 1.0) return;
			me._sel_floorplan_scroll.ggScrollPosY = (me._sel_floorplan_scroll__vertScrollFg.offsetTop + diffY);
			me._sel_floorplan_scroll.ggScrollPosY = Math.max(me._sel_floorplan_scroll.ggScrollPosY, 0);
			me._sel_floorplan_scroll.ggScrollPosY = Math.min(me._sel_floorplan_scroll.ggScrollPosY, me._sel_floorplan_scroll__vertScrollBg.offsetHeight - me._sel_floorplan_scroll__vertScrollFg.offsetHeight);
			me._sel_floorplan_scroll__vertScrollFg.style.top = me._sel_floorplan_scroll.ggScrollPosY + 'px';
			let percentScrolled = me._sel_floorplan_scroll.ggScrollPosY / (me._sel_floorplan_scroll__vertScrollBg.offsetHeight - me._sel_floorplan_scroll__vertScrollFg.offsetHeight);
			me._sel_floorplan_scroll__content.style.top = -(Math.round((me._sel_floorplan_scroll.ggContentHeight * (1.0 - me._sel_floorplan_scroll.ggVPercentVisible)) * percentScrolled)) + me._sel_floorplan_scroll.ggContentTopOffset + 'px';
			me._sel_floorplan_scroll.ggScrollPosYPercent = (me._sel_floorplan_scroll__vertScrollFg.offsetTop / me._sel_floorplan_scroll__vertScrollBg.offsetHeight);
		}
		me._sel_floorplan_scroll.ggScrollByYSmooth = function(diffY) {
			if(!me._sel_floorplan_scroll.ggVertScrollVisible || diffY == 0 || me._sel_floorplan_scroll.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._sel_floorplan_scroll.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._sel_floorplan_scroll.ggScrollPosY >= me._sel_floorplan_scroll__vertScrollBg.offsetHeight - me._sel_floorplan_scroll__vertScrollFg.offsetHeight)) {
					me._sel_floorplan_scroll.ggScrollPosY = Math.min(me._sel_floorplan_scroll.ggScrollPosY, me._sel_floorplan_scroll__vertScrollBg.offsetHeight - me._sel_floorplan_scroll__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._sel_floorplan_scroll.ggScrollPosY <= 0)) {
					me._sel_floorplan_scroll.ggScrollPosY = Math.max(me._sel_floorplan_scroll.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._sel_floorplan_scroll__vertScrollFg.style.top = me._sel_floorplan_scroll.ggScrollPosY + 'px';
			let percentScrolled = me._sel_floorplan_scroll.ggScrollPosY / (me._sel_floorplan_scroll__vertScrollBg.offsetHeight - me._sel_floorplan_scroll__vertScrollFg.offsetHeight);
			me._sel_floorplan_scroll__content.style.top = -(Math.round((me._sel_floorplan_scroll.ggContentHeight * (1.0 - me._sel_floorplan_scroll.ggVPercentVisible)) * percentScrolled)) + me._sel_floorplan_scroll.ggContentTopOffset + 'px';
			me._sel_floorplan_scroll.ggScrollPosYPercent = (me._sel_floorplan_scroll__vertScrollFg.offsetTop / me._sel_floorplan_scroll__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._sel_floorplan_scroll.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._sel_floorplan_scroll.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._sel_floorplan_scroll.ggHPercentVisible);
					me._sel_floorplan_scroll.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._sel_floorplan_scroll.clientWidth - (me._sel_floorplan_scroll.ggVertScrollVisible ? 4 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._sel_floorplan_scroll.clientWidth - (me._sel_floorplan_scroll.ggVertScrollVisible ? 4 : 0))) * me._sel_floorplan_scroll.ggHPercentVisible);
					me._sel_floorplan_scroll.ggScrollByXSmooth(diffX);
				}
			}
			if (me._sel_floorplan_scroll.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._sel_floorplan_scroll.ggVPercentVisible);
					me._sel_floorplan_scroll.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._sel_floorplan_scroll.clientHeight - (me._sel_floorplan_scroll.ggHorScrollVisible ? 4 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._sel_floorplan_scroll.clientHeight - (me._sel_floorplan_scroll.ggHorScrollVisible ? 4 : 0))) * me._sel_floorplan_scroll.ggVPercentVisible);
					me._sel_floorplan_scroll.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._sel_floorplan_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._sel_floorplan_scroll.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._sel_floorplan_scroll__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_floorplan_scroll.ggDragInertiaX *= 0.65;
					me._sel_floorplan_scroll.ggDragInertiaY *= 0.65;
					me._sel_floorplan_scroll.ggScrollByX(me._sel_floorplan_scroll.ggDragInertiaX);
					me._sel_floorplan_scroll.ggScrollByY(me._sel_floorplan_scroll.ggDragInertiaY);
					if (Math.abs(me._sel_floorplan_scroll.ggDragInertiaX) < 1.0 && Math.abs(me._sel_floorplan_scroll.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._sel_floorplan_scroll__content.ontouchend = null;
				me._sel_floorplan_scroll__content.ontouchmove = null;
				me._sel_floorplan_scroll__content.onpointerup = null;
				me._sel_floorplan_scroll__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._sel_floorplan_scroll__content.onpointerup = me._sel_floorplan_scroll__content.ontouchend;
		}
			me._sel_floorplan_scroll__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._sel_floorplan_scroll.ggDragLastX) * me._sel_floorplan_scroll.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._sel_floorplan_scroll.ggDragLastY) * me._sel_floorplan_scroll.ggVPercentVisible;
				me._sel_floorplan_scroll.ggDragInertiaX = -diffX;
				me._sel_floorplan_scroll.ggDragInertiaY = -diffY;
				me._sel_floorplan_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._sel_floorplan_scroll.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._sel_floorplan_scroll.ggScrollByX(-diffX);
				me._sel_floorplan_scroll.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._sel_floorplan_scroll__content.onpointermove = me._sel_floorplan_scroll__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._sel_floorplan_scroll__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 230px; height: 4px; background-color: rgba(128,128,128,0.588235); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._sel_floorplan_scroll__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 230px; height: 4px; background-color: rgba(0,170,255,1); pointer-events: auto;');
		me._sel_floorplan_scroll.ggScrollPosX = 0;
		me._sel_floorplan_scroll.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._sel_floorplan_scroll.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_floorplan_scroll.ggDragInertiaX *= 0.65;
					me._sel_floorplan_scroll.ggScrollByX(me._sel_floorplan_scroll.ggDragInertiaX);
					if (Math.abs(me._sel_floorplan_scroll.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._sel_floorplan_scroll.ggDragLastX;
				me._sel_floorplan_scroll.ggDragInertiaX = diffX;
				me._sel_floorplan_scroll.ggDragLastX = e.clientX;
				me._sel_floorplan_scroll.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._sel_floorplan_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_floorplan_scroll.ggDragInertiaX *= 0.65;
					me._sel_floorplan_scroll.ggScrollByX(me._sel_floorplan_scroll.ggDragInertiaX);
					if (Math.abs(me._sel_floorplan_scroll.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._sel_floorplan_scroll.ggDragLastX;
				me._sel_floorplan_scroll.ggDragInertiaX = diffX;
				me._sel_floorplan_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._sel_floorplan_scroll.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._sel_floorplan_scroll.ggScrollWidth;
			if (e.offsetX < me._sel_floorplan_scroll.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._sel_floorplan_scroll.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._sel_floorplan_scroll__horScrollBg.getBoundingClientRect();
			var diffX = me._sel_floorplan_scroll.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._sel_floorplan_scroll.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._sel_floorplan_scroll.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._sel_floorplan_scroll.ggScrollByXSmooth(30 * me._sel_floorplan_scroll.ggHPercentVisible * wheelDelta);
		});
		elCornerBg = me._sel_floorplan_scroll__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 4px; height: 4px; background-color: rgba(255,170,0,0);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="sel_floorplan_scroll";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : -50px;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._sel_floorplan_scroll.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_floorplan_scroll.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContentWidth = contentWidth;
				this.ggContentHeight = contentHeight;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = -(Math.round(me._sel_floorplan_scroll.ggScrollPosX / me._sel_floorplan_scroll.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._sel_floorplan_scroll__horScrollBg.style.visibility = 'inherit';
					me._sel_floorplan_scroll__horScrollFg.style.visibility = 'inherit';
					me._sel_floorplan_scroll.ggHorScrollVisible = true;
				} else {
					me._sel_floorplan_scroll__horScrollBg.style.visibility = 'hidden';
					me._sel_floorplan_scroll__horScrollFg.style.visibility = 'hidden';
					me._sel_floorplan_scroll.ggHorScrollVisible = false;
				}
				if(me._sel_floorplan_scroll.ggHorScrollVisible) {
					me._sel_floorplan_scroll.ggAvailableHeight = me._sel_floorplan_scroll.clientHeight - 4;
					if (me._sel_floorplan_scroll.ggVertScrollVisible) {
						me._sel_floorplan_scroll.ggAvailableWidth = me._sel_floorplan_scroll.clientWidth - 4;
						me._sel_floorplan_scroll.ggAvailableWidthWithScale = me._sel_floorplan_scroll.getBoundingClientRect().width - me._sel_floorplan_scroll__horScrollBg.getBoundingClientRect().height;
					} else {
						me._sel_floorplan_scroll.ggAvailableWidth = me._sel_floorplan_scroll.clientWidth;
						me._sel_floorplan_scroll.ggAvailableWidthWithScale = me._sel_floorplan_scroll.getBoundingClientRect().width;
					}
					me._sel_floorplan_scroll__horScrollBg.style.width = me._sel_floorplan_scroll.ggAvailableWidth + 'px';
					me._sel_floorplan_scroll.ggHPercentVisible = contentWidth != 0 ? me._sel_floorplan_scroll.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._sel_floorplan_scroll.ggHPercentVisible > 1.0) me._sel_floorplan_scroll.ggHPercentVisible = 1.0;
					me._sel_floorplan_scroll.ggScrollWidth = Math.round(me._sel_floorplan_scroll__horScrollBg.offsetWidth * me._sel_floorplan_scroll.ggHPercentVisible);
					me._sel_floorplan_scroll__horScrollFg.style.width = me._sel_floorplan_scroll.ggScrollWidth + 'px';
					me._sel_floorplan_scroll.ggScrollPosX = me._sel_floorplan_scroll.ggScrollPosXPercent * me._sel_floorplan_scroll.ggAvailableWidth;
					me._sel_floorplan_scroll.ggScrollPosX = Math.min(me._sel_floorplan_scroll.ggScrollPosX, me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
					me._sel_floorplan_scroll__horScrollFg.style.left = me._sel_floorplan_scroll.ggScrollPosX + 'px';
					if (me._sel_floorplan_scroll.ggHPercentVisible < 1.0) {
						let percentScrolled = me._sel_floorplan_scroll.ggScrollPosX / (me._sel_floorplan_scroll__horScrollBg.offsetWidth - me._sel_floorplan_scroll__horScrollFg.offsetWidth);
						me._sel_floorplan_scroll__content.style.left = -(Math.round((me._sel_floorplan_scroll.ggContentWidth * (1.0 - me._sel_floorplan_scroll.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._sel_floorplan_scroll.ggAvailableHeight = me._sel_floorplan_scroll.clientHeight;
					me._sel_floorplan_scroll.ggScrollPosX = 0;
					me._sel_floorplan_scroll.ggScrollPosXPercent = 0.0;
					me._sel_floorplan_scroll__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(horScrollWasVisible != me._sel_floorplan_scroll.ggHorScrollVisible || vertScrollWasVisible != me._sel_floorplan_scroll.ggVertScrollVisible) {
					me.updateSize(me._sel_floorplan_scroll);
					me._sel_floorplan_scroll.ggUpdatePosition();
				}
			}
		}
		el=me._sel_floorplan_clone=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 50;
		el.ggHeight = 30;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._sel_floorplan_clone.callChildLogicBlocks_changenode = function(){
			if(me._sel_floorplan_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_floorplan_clone.ggInstances.length; i++) {
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		me._sel_floorplan_clone.callChildLogicBlocks_mouseover = function(){
			if(me._sel_floorplan_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_floorplan_clone.ggInstances.length; i++) {
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		me._sel_floorplan_clone.callChildLogicBlocks_active = function(){
			if(me._sel_floorplan_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_floorplan_clone.ggInstances.length; i++) {
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_bordercolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_bordercolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		me._sel_floorplan_clone.callChildLogicBlocks_clonerchanged = function(){
			if(me._sel_floorplan_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_floorplan_clone.ggInstances.length; i++) {
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		me._sel_floorplan_clone.callChildLogicBlocks_varchanged_map_sel = function(){
			if(me._sel_floorplan_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_floorplan_clone.ggInstances.length; i++) {
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_textcolor();
					}
					if (me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button && me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor) {
						me._sel_floorplan_clone.ggInstances[i]._sel_floorplan_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		el.ggAutoPosition = function(init) {
			var currXPos = 0;
			var numElements = me._sel_floorplan_clone.ggInstances.length;
			var currElement = 0;
			for (var i=0; i<me._sel_floorplan_clone.ggNumCols; i++) {
				var colMaxWidth = 0;
				for (var j=0; j<me._sel_floorplan_clone.ggNumRows; j++) {
					if (numElements>currElement) {
						me._sel_floorplan_clone.childNodes[currElement].style['left'] = currXPos + 'px';
						me._sel_floorplan_clone.childNodes[currElement].style['width'] ='0px';
						colMaxWidth = Math.max(colMaxWidth, me._sel_floorplan_clone.childNodes[currElement].scrollWidth);
						me._sel_floorplan_clone.childNodes[currElement].style['width'] = colMaxWidth + 'px';
					}
					currElement++;
				}
				currXPos += colMaxWidth;
			}
		}
		el.ggUpdate = function(filter) {
			if(me._sel_floorplan_clone.ggUpdating == true) return;
			me._sel_floorplan_clone.ggUpdating = true;
			var el=me._sel_floorplan_clone;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._sel_floorplan_clone.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._sel_floorplan_clone.ggHeight) + 'px';
				parameter.left=(column * me._sel_floorplan_clone.ggWidth) + 'px';
				parameter.width=me._sel_floorplan_clone.ggWidth + 'px';
				parameter.height=me._sel_floorplan_clone.ggHeight + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_sel_floorplan_clone_Class(nodeId, me, el, parameter);
				currentIndex++;
				inst.__div.style['width'] = '0px';
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
			}
			me._sel_floorplan_clone.callChildLogicBlocks_changenode();
			me._sel_floorplan_clone.callChildLogicBlocks_mouseover();
			me._sel_floorplan_clone.callChildLogicBlocks_active();
			me._sel_floorplan_clone.callChildLogicBlocks_clonerchanged();
			me._sel_floorplan_clone.callChildLogicBlocks_varchanged_map_sel();
			me._sel_floorplan_clone.ggAutoPosition(true);
			me._sel_floorplan_clone.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._sel_floorplan_clone.parentNode.classList.contains('ggskin_subelement') && me._sel_floorplan_clone.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._sel_floorplan_clone.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"Tang5",title:"T\u1ea7ng 5"},
			{tag:"Tang6",title:"T\u1ea7ng 6"},
			];
		el.ggId="sel_floorplan_clone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 30px;';
		hs+='left : 35px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 50px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._sel_floorplan_clone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_floorplan_clone.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._sel_floorplan_clone.childNodes.length; i++) {
				var child=me._sel_floorplan_clone.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._sel_floorplan_clone.ggUpdatePosition=function (useTransition) {
				me._sel_floorplan_clone.ggUpdate();
		}
		me._sel_floorplan_clone.ggNodeChange=function () {
			me._sel_floorplan_clone.ggUpdateConditionNodeChange();
		}
		me._sel_floorplan_scroll__content.appendChild(me._sel_floorplan_clone);
		el=me._tt_current=document.createElement('div');
		els=me._tt_current__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_current";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 40px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 170px;';
		hs+='height: auto;';
		hs+='border: 0px solid #4f4f4f;';
		hs+='border-radius: 15px;';
		hs+=cssPrefix + 'border-radius: 15px;';
		hs+='color: rgba(247,176,45,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 3px 4px 3px 4px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._tt_current.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._tt_current.ggUpdateText();
		player.addListener('changenode', function() {
			me._tt_current.ggUpdateText();
		});
		el.appendChild(els);
		me._tt_current.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_current.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('map_scale_normal') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_current.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_current.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_current.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._tt_current.ggCurrentLogicStatePosition == 0) {
					me._tt_current.style.left='170px';
					me._tt_current.style.top='10px';
				}
				else {
					me._tt_current.style.left='40px';
					me._tt_current.style.top='5px';
				}
			}
		}
		me._tt_current.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getVariableValue('map_scale_normal') == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._tt_current.ggCurrentLogicStateSize != newLogicStateSize) {
				me._tt_current.ggCurrentLogicStateSize = newLogicStateSize;
				me._tt_current__text.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._tt_current.ggCurrentLogicStateSize == 0) {
					me._tt_current__text.style.width='280px';
					me._tt_current__text.style.height='40px';
					setTimeout(function() {skin.updateSize(me._tt_current);}, 500);
				}
				else {
					me._tt_current__text.style.width='170px';
					me._tt_current__text.style.height='40px';
					setTimeout(function() {skin.updateSize(me._tt_current);}, 500);
				}
			}
		}
		me._tt_current.ggUpdatePosition=function (useTransition) {
		}
		me._sel_floorplan_scroll__content.appendChild(me._tt_current);
		el=me._global_ico=document.createElement('div');
		els=me._global_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiA8ZyBpZD0iZ2xvYmUtMiI+CiAgPHBvbHlnb24gZmlsbD0iIzUxNTE1MSIgcG9pbnRzPSIxMy4zIDYuMiAxMy4zIDYuMiAxMy4zIDYuMiAxMy4zIDYuMiIvPgogIDxwYXRoIGZpbGw9IiM1MTUxNTEiIGQ9Ik0xNiwuNEExNS42LDE1LjYsMCwxLDAsMzEuNiwxNiwxNS42LDE1LjYsMCwwLDAsMTYsLjRaTTMwLjMsMTZ2LjhsLS4zLS43LS40LTFhMS42LDEuNiwwLDAsMC0uNi0uNWMtLjItLjEtLjMtLjQtLjctLjZhMS42LDEuNiwwLD'+
			'AsMC0uOS0uM2MtLjMsMC0uNi0uNS0xLS43SDI2bC40LjhjMCwuMi41LjQsMSwuM2E0LjUsNC41LDAsMCwwLC41LjhjLjEuMS0uMS4zLS40LjVsLS40LjMtLjkuNmMtLjIuMS0uOC40LTEuMS4xcy0uMS0uNS0uMy0uN0wyMy4xLDEzbC0uNS0uN2MtLjItLjEuNC0uMS40LS4xYTEuOCwxLjgsMCwwLDAtLjEtLjYsMy41LDMuNSwwLDAsMSwuMS0uN2wtLjcuNGMtLjIuMS0uNC0uMi0uNi0uNGE0LjEsNC4xLDAsMCwxLS41LS45LjQuNCwwLDAsMSwuMy0uNGwuNS0uM2EzLjEsMy4xLDAsMCwxLDEsMGguOXMuMi0uNCwwLS41LS43LS41LS45LS40LjEtLjMuMy0uNWgtLjZsLS43LjMtLjYuNGMtLjIuMy4x'+
			'LjctLjIuOGwtLjUuMmgtLjZjLS42LDAtLjIuNS0uMS43bC0uNC0uNUwxOS4yLDlsLS42LS40LS45LS41di41bC43LjZoMGwuMy41SDE4VjkuM2MtLjYtLjItLjUtLjMtLjUtLjRsLS42LS40LS44LjItLjUuM2ExLDEsMCwwLDAtLjYuNSw0LjQsNC40LDAsMCwxLS43LjgsMS4xLDEuMSwwLDAsMS0uNy4ybC0xLS4ydi0xcy4xLS41LjEtLjZoLjRsLjgtLjJoLjNsLjMtLjVhLjQuNCwwLDAsMS0uMS0uNmMuMS0uMi42LS4yLjgtLjRsLjUtLjMuOC0uNy42LS4ycy45LjgsMS4xLjhsLjctLjRzLjItLjUuMS0uNmEyLjQsMi40LDAsMCwwLS4zLS43bC0uMy40LS4zLjVzLS43LDAtLjgtLjItLjItLjQtLj'+
			'ItLjZoLS44Yy0uMy4xLDAtLjYsMC0uNnMuNC0uNC42LS40bC45LS4zLDEuMS0uM2gyLjdzMSwuMy43LjZsLjUuNGMuMi4xLjUtLjIuOC0uM0ExNC4zLDE0LjMsMCwwLDEsMzAuMywxNlpNNC42LDcuNmMwLC4yLS4zLjIsMCwuOHMwLDEsMCwxYTUuOCw1LjgsMCwwLDAtMSwuOGMtLjIuMS0uNi43LS40LjVzLjYtLjMuNC4xYTgsOCwwLDAsMC0uOSwxLjRjLS4xLjMtLjYuOS0uNiwxLjJzLS4zLDEtLjIsMS4zYTQuNCw0LjQsMCwwLDEtLjIsMUExMy45LDEzLjksMCwwLDEsNC41LDcuNlpNNi4zLDUuNWExMy42LDEzLjYsMCwwLDEsNC42LTIuOGwtLjQuNHMtLjQsMC0xLjEuOGwtLjcuN2EuOS45LDAs'+
			'MCwxLS40LjVsLS42LjZMNy4xLDZsLS41LS4zcy0uNC4yLS4zLDBabTYuNSwxLjMtLjItLjQuMi0uNC41LjJ2LTFsLjUtLjMuNC42LjYuNy0uNC4zLTEuMS4zVjYuMlptNyw1Yy4xLS4xLjUuMi41LjJsMS42LjRjLjIuMi42LjMuNy41YTIuMiwyLjIsMCwwLDEsLjUuOCw3LjksNy45LDAsMCwxLC40LjksNy42LDcuNiwwLDAsMCwuNCwxLjFsMS40LDEuOWgxYTMuMywzLjMsMCwwLDEtLjMuNmwtLjYuOGExLjMsMS4zLDAsMCwxLS43LjgsMiwyLDAsMCwwLS40LjgsMi43LDIuNywwLDAsMC0uNC43cy4xLDEuMS4xLDEuMy0uMy44LS4zLjhsLS41LjUtLjcuOHYuOWwtLjguNWEzLjEsMy4xLDAsMCwxLS'+
			'40LjZjLS4yLjMtMS4xLjYtMS4zLjdsLTEuNC4ydi0xYTkuMiw5LjIsMCwwLDAtLjMtLjljLS4yLS4yLS4xLS41LS40LS44cy0uNC0uNS0uNC0uNmExLjYsMS42LDAsMCwxLDAtLjcsMi44LDIuOCwwLDAsMSwuNC0uOC43LjcsMCwwLDAtLjItLjcsMy44LDMuOCwwLDAsMS0uMS0xYzAtLjEtLjQtLjQtLjYtLjZzLS4xLS4zLS4xLS41YTMuNywzLjcsMCwwLDEtLjEtMS4xYzAtLjQtLjUtLjEtLjgsMHMtLjYtLjEtLjYtLjUtLjYsMC0uOS4ybC0xLjMuNGEuNi42LDAsMCwxLS42LS4ybC0uNy0uNWEyLjMsMi4zLDAsMCwxLS43LS43LDUsNSwwLDAsMS0uOC0xLjQsMi43LDIuNywwLDAsMSwwLS45di0u'+
			'OWEzLjYsMy42LDAsMCwxLC40LS45bC45LS43Yy4yLS4xLjYtLjQuNi0uNnMuMi0uMy4zLS41LjUtLjguOS0uNmguNmwuOC0uMy44LS4yLjYuMmguN2wuMi45YS43LjcsMCwwLDAsLjQuNUMxOCwxMiwxOS4yLDEyLjMsMTkuOCwxMS44Wk0yNiwyMi40YzAsLjEtLjEuNi0uMS44YTIuNCwyLjQsMCwwLDAtLjIuOGwtLjUuOC0uNi40Yy0uMi4xLS4zLS4zLS4yLS42YTMuNCwzLjQsMCwwLDEsLjMtLjgsMS4zLDEuMywwLDAsMSwuMS0uNWMwLS4yLjctLjUuNy0uNWwuNC0uOEExLDEsMCwwLDEsMjYsMjIuNFpNMi4xLDE5LjJsLjMuMi42LjMuNy41Yy4zLjEuMiwwLC42LjVzLjQuNS41LjhsLjQuNy42Lj'+
			'NhLjcuNywwLDAsMCwuNi4zbC45LjVjLjMuMS4zLjYuMy42bC0uMy43LS4yLjkuMi42YTEsMSwwLDAsMS0uNi4zYy0uMiwwLS4yLjEtLjQsMEExMy42LDEzLjYsMCwwLDEsMi4xLDE5LjJaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._global_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="global_ico";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 28px;';
		hs+='left : 4px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 28px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._global_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._global_ico.onclick=function (e) {
			player.setVariableValue('map_sel', Number("0"));
			player.openNext("{node11}","");
			if (
				(
					((player.getIsMobile() == true))
				)
			) {
				player.setVariableValue('map_hide', true);
			}
		}
		me._global_ico.onmouseover=function (e) {
			me.elementMouseOver['global_ico']=true;
			me._global_active_ico.logicBlock_visible();
		}
		me._global_ico.onmouseout=function (e) {
			me.elementMouseOver['global_ico']=false;
			me._global_active_ico.logicBlock_visible();
		}
		me._global_ico.ontouchend=function (e) {
			me.elementMouseOver['global_ico']=false;
			me._global_active_ico.logicBlock_visible();
		}
		me._global_ico.ggUpdatePosition=function (useTransition) {
		}
		me._global_ico.ggNodeChange=function () {
			player.setVariableValue('map_scale_full', false);
		}
		el=me._global_active_ico=document.createElement('div');
		els=me._global_active_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiA8ZyBpZD0iZ2xvYmUtMiI+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQuMyIgZmlsbD0iI2ZmZiIvPgogIDxwb2x5Z29uIGZpbGw9IiM1MTUxNTEiIHBvaW50cz0iMTMuMyA2LjIgMTMuMyA2LjIgMTMuMyA2LjIgMTMuMyA2LjIiLz4KICA8cGF0aCBmaWxsPSIjNTE1MTUxIiBkPSJNMTYsLjRBMTUuNiwxNS42LDAsMSwwLDMxLjYsMTYsMTUuNiwxNS42LDAsMCwwLDE2LC40Wk0zMC4zLDE2di44bC0uMy0uNy0uNC0xYT'+
			'EuNiwxLjYsMCwwLDAtLjYtLjVjLS4yLS4xLS4zLS40LS43LS42YTEuNiwxLjYsMCwwLDAtLjktLjNjLS4zLDAtLjYtLjUtMS0uN0gyNmwuNC44YzAsLjIuNS40LDEsLjNhNC41LDQuNSwwLDAsMCwuNS44Yy4xLjEtLjEuMy0uNC41bC0uNC4zLS45LjZjLS4yLjEtLjguNC0xLjEuMXMtLjEtLjUtLjMtLjdMMjMuMSwxM2wtLjUtLjdjLS4yLS4xLjQtLjEuNC0uMWExLjgsMS44LDAsMCwwLS4xLS42LDMuNSwzLjUsMCwwLDEsLjEtLjdsLS43LjRjLS4yLjEtLjQtLjItLjYtLjRhNC4xLDQuMSwwLDAsMS0uNS0uOS40LjQsMCwwLDEsLjMtLjRsLjUtLjNhMy4xLDMuMSwwLDAsMSwxLDBoLjlzLjItLjQs'+
			'MC0uNS0uNy0uNS0uOS0uNC4xLS4zLjMtLjVoLS42bC0uNy4zLS42LjRjLS4yLjMuMS43LS4yLjhsLS41LjJoLS42Yy0uNiwwLS4yLjUtLjEuN2wtLjQtLjVMMTkuMiw5bC0uNi0uNC0uOS0uNXYuNWwuNy42aDBsLjMuNUgxOFY5LjNjLS42LS4yLS41LS4zLS41LS40bC0uNi0uNC0uOC4yLS41LjNhMSwxLDAsMCwwLS42LjUsNC40LDQuNCwwLDAsMS0uNy44LDEuMSwxLjEsMCwwLDEtLjcuMmwtMS0uMnYtMXMuMS0uNS4xLS42aC40bC44LS4yaC4zbC4zLS41YS40LjQsMCwwLDEtLjEtLjZjLjEtLjIuNi0uMi44LS40bC41LS4zLjgtLjcuNi0uMnMuOS44LDEuMS44bC43LS40cy4yLS41LjEtLjZhMi'+
			'40LDIuNCwwLDAsMC0uMy0uN2wtLjMuNC0uMy41cy0uNywwLS44LS4yLS4yLS40LS4yLS42aC0uOGMtLjMuMSwwLS42LDAtLjZzLjQtLjQuNi0uNGwuOS0uMywxLjEtLjNoMi43czEsLjMuNy42bC41LjRjLjIuMS41LS4yLjgtLjNBMTQuMywxNC4zLDAsMCwxLDMwLjMsMTZaTTQuNiw3LjZjMCwuMi0uMy4yLDAsLjhzMCwxLDAsMWE1LjgsNS44LDAsMCwwLTEsLjhjLS4yLjEtLjYuNy0uNC41cy42LS4zLjQuMWE4LDgsMCwwLDAtLjksMS40Yy0uMS4zLS42LjktLjYsMS4ycy0uMywxLS4yLDEuM2E0LjQsNC40LDAsMCwxLS4yLDFBMTMuOSwxMy45LDAsMCwxLDQuNSw3LjZaTTYuMyw1LjVhMTMuNiwx'+
			'My42LDAsMCwxLDQuNi0yLjhsLS40LjRzLS40LDAtMS4xLjhsLS43LjdhLjkuOSwwLDAsMS0uNC41bC0uNi42TDcuMSw2bC0uNS0uM3MtLjQuMi0uMywwWm02LjUsMS4zLS4yLS40LjItLjQuNS4ydi0xbC41LS4zLjQuNi42LjctLjQuMy0xLjEuM1Y2LjJabTcsNWMuMS0uMS41LjIuNS4ybDEuNi40Yy4yLjIuNi4zLjcuNWEyLjIsMi4yLDAsMCwxLC41LjgsNy45LDcuOSwwLDAsMSwuNC45LDcuNiw3LjYsMCwwLDAsLjQsMS4xbDEuNCwxLjloMWEzLjMsMy4zLDAsMCwxLS4zLjZsLS42LjhhMS4zLDEuMywwLDAsMS0uNy44LDIsMiwwLDAsMC0uNC44LDIuNywyLjcsMCwwLDAtLjQuN3MuMSwxLjEuMS'+
			'wxLjMtLjMuOC0uMy44bC0uNS41LS43Ljh2LjlsLS44LjVhMy4xLDMuMSwwLDAsMS0uNC42Yy0uMi4zLTEuMS42LTEuMy43bC0xLjQuMnYtMWE5LjIsOS4yLDAsMCwwLS4zLS45Yy0uMi0uMi0uMS0uNS0uNC0uOHMtLjQtLjUtLjQtLjZhMS42LDEuNiwwLDAsMSwwLS43LDIuOCwyLjgsMCwwLDEsLjQtLjguNy43LDAsMCwwLS4yLS43LDMuOCwzLjgsMCwwLDEtLjEtMWMwLS4xLS40LS40LS42LS42cy0uMS0uMy0uMS0uNWEzLjcsMy43LDAsMCwxLS4xLTEuMWMwLS40LS41LS4xLS44LDBzLS42LS4xLS42LS41LS42LDAtLjkuMmwtMS4zLjRhLjYuNiwwLDAsMS0uNi0uMmwtLjctLjVhMi4zLDIuMyww'+
			'LDAsMS0uNy0uNyw1LDUsMCwwLDEtLjgtMS40LDIuNywyLjcsMCwwLDEsMC0uOXYtLjlhMy42LDMuNiwwLDAsMSwuNC0uOWwuOS0uN2MuMi0uMS42LS40LjYtLjZzLjItLjMuMy0uNS41LS44LjktLjZoLjZsLjgtLjMuOC0uMi42LjJoLjdsLjIuOWEuNy43LDAsMCwwLC40LjVDMTgsMTIsMTkuMiwxMi4zLDE5LjgsMTEuOFpNMjYsMjIuNGMwLC4xLS4xLjYtLjEuOGEyLjQsMi40LDAsMCwwLS4yLjhsLS41LjgtLjYuNGMtLjIuMS0uMy0uMy0uMi0uNmEzLjQsMy40LDAsMCwxLC4zLS44LDEuMywxLjMsMCwwLDEsLjEtLjVjMC0uMi43LS41LjctLjVsLjQtLjhBMSwxLDAsMCwxLDI2LDIyLjRaTTIuMS'+
			'wxOS4ybC4zLjIuNi4zLjcuNWMuMy4xLjIsMCwuNi41cy40LjUuNS44bC40LjcuNi4zYS43LjcsMCwwLDAsLjYuM2wuOS41Yy4zLjEuMy42LjMuNmwtLjMuNy0uMi45LjIuNmExLDEsMCwwLDEtLjYuM2MtLjIsMC0uMi4xLS40LDBBMTMuNiwxMy42LDAsMCwxLDIuMSwxOS4yWiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNiwuM0ExNS44LDE1LjgsMCwwLDAsLjMsMTYsMTUuOCwxNS44LDAsMCwwLDE2LDMxLjcsMTUuOCwxNS44LDAsMCwwLDMxLjcsMTYsMTUuOCwxNS44LDAsMCwwLDE2LC4zWm0wLDMwQTE0LjMsMTQuMywwLDEsMSwzMC4zLDE2LDE0LjMsMTQuMywwLDAsMSwxNiwzMC4zWiIv'+
			'PgogPC9nPgo8L3N2Zz4K';
		me._global_active_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="global_active_ico";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._global_active_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._global_active_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['global_ico'] == true)) || 
				((player.getVariableValue('map_sel') == 0))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._global_active_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._global_active_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._global_active_ico.style[domTransition]='';
				if (me._global_active_ico.ggCurrentLogicStateVisible == 0) {
					me._global_active_ico.style.visibility=(Number(me._global_active_ico.style.opacity)>0||!me._global_active_ico.style.opacity)?'inherit':'hidden';
					me._global_active_ico.ggVisible=true;
				}
				else {
					me._global_active_ico.style.visibility="hidden";
					me._global_active_ico.ggVisible=false;
				}
			}
		}
		me._global_active_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._global_ico.appendChild(me._global_active_ico);
		me._sel_floorplan_scroll__content.appendChild(me._global_ico);
		me._map_container.appendChild(me._sel_floorplan_scroll);
		el=me._map_zoom=document.createElement('div');
		el.ggId="map_zoom";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 5px;';
		hs+='height : 76px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 36px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_zoom.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_zoom.ggUpdatePosition=function (useTransition) {
		}
		el=me._map_tru=document.createElement('div');
		els=me._map_tru__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0iXy1fbm9ybWFsIiBkYXRhLW5hbWU9Ii0gbm9ybWFsIj4KICA8cmVjdCB5PSIyLjYiIGhlaWdodD0iNTguNzEiIHg9IjIuNiIgb3BhY2l0eT0iMC45IiB3aWR0aD0iNTguNyIvPgogIDxyZWN0IHk9IjMwLjEiIGhlaWdodD0iMy44OCIgZmlsbD0iI2ZmZiIgeD0iMTYuMiIgd2lkdGg9IjMxLjUiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._map_tru__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._map_tru__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0iXy1fYWN0aXZlIiBkYXRhLW5hbWU9Ii0gYWN0aXZlIj4KICA8cmVjdCB5PSIyLjYiIGhlaWdodD0iNTguNzEiIHg9IjIuNiIgb3BhY2l0eT0iMC45IiB3aWR0aD0iNTguNyIvPgogIDxyZWN0IHk9IjI5LjgiIGhlaWdodD0iNC40IiBmaWxsPSIjZmZmIiB4PSIxNC4xIiB3aWR0aD0iMzUuOCIvPgogPC9nPgo8L3N2Zz4K';
		me._map_tru__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="map_tru";
		el.ggDx=0;
		el.ggDy=20;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_tru.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_tru.onclick=function (e) {
			if (me._map_01.ggMap) me._map_01.ggMap.setZoom(me._map_01.ggMap.getZoom() - 1);
		}
		me._map_tru.onmouseover=function (e) {
			me._map_tru__img.style.visibility='hidden';
			me._map_tru__imgo.style.visibility='inherit';
		}
		me._map_tru.onmouseout=function (e) {
			me._map_tru__img.style.visibility='inherit';
			me._map_tru__imgo.style.visibility='hidden';
		}
		me._map_tru.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._map_zoom.appendChild(me._map_tru);
		el=me._map_plus=document.createElement('div');
		els=me._map_plus__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0icGx1c19ub3JtYWwiIGRhdGEtbmFtZT0icGx1cyBub3JtYWwiPgogIDxyZWN0IHk9IjIuNiIgaGVpZ2h0PSI1OC43MSIgeD0iMi42IiBvcGFjaXR5PSIwLjkiIHdpZHRoPSI1OC43Ii8+CiAgPHJlY3QgeT0iMzAuMSIgaGVpZ2h0PSIzLjg4IiBmaWxsPSIjZmZmIiB4PSIxNi4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDY0KSByb3RhdGUoLTkwKSIgd2lkdGg9IjMxLjUiLz4KICA8cmVjdCB5PSIzMC4xIiBoZWlnaH'+
			'Q9IjMuODgiIGZpbGw9IiNmZmYiIHg9IjE2LjIiIHdpZHRoPSIzMS41Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._map_plus__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._map_plus__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0icGx1c19hY3RpdmUiIGRhdGEtbmFtZT0icGx1cyBhY3RpdmUiPgogIDxyZWN0IHk9IjIuNiIgaGVpZ2h0PSI1OC43MSIgeD0iMi42IiBvcGFjaXR5PSIwLjkiIHdpZHRoPSI1OC43Ii8+CiAgPHJlY3QgeT0iMjkuOCIgaGVpZ2h0PSI0LjQiIGZpbGw9IiNmZmYiIHg9IjE0LjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNjQpIHJvdGF0ZSgtOTApIiB3aWR0aD0iMzUuOCIvPgogIDxyZWN0IHk9IjI5LjgiIGhlaWdodD'+
			'0iNC40IiBmaWxsPSIjZmZmIiB4PSIxNC4xIiB3aWR0aD0iMzUuOCIvPgogPC9nPgo8L3N2Zz4K';
		me._map_plus__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="map_plus";
		el.ggDx=0;
		el.ggDy=-20;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_plus.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_plus.onclick=function (e) {
			if (me._map_01.ggMap) me._map_01.ggMap.setZoom(me._map_01.ggMap.getZoom() + 1);
		}
		me._map_plus.onmouseover=function (e) {
			me._map_plus__img.style.visibility='hidden';
			me._map_plus__imgo.style.visibility='inherit';
		}
		me._map_plus.onmouseout=function (e) {
			me._map_plus__img.style.visibility='inherit';
			me._map_plus__imgo.style.visibility='hidden';
		}
		me._map_plus.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._map_zoom.appendChild(me._map_plus);
		me._map_container.appendChild(me._map_zoom);
		el=me._map_scale=document.createElement('div');
		els=me._map_scale__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0ic2NhbGVfbm9ybWFsIiBkYXRhLW5hbWU9InNjYWxlIG5vcm1hbCI+CiAgPHJlY3QgeT0iMi42IiBoZWlnaHQ9IjU4LjcxIiBmaWxsPSIjMDEwMTAxIiB4PSIyLjYiIHdpZHRoPSI1OC43Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0LjksMTcuOWEyLjEsMi4xLDAsMCwwLS43LDMuM2MuNi44LjYuNyw4LC43aDYuOUwyOC42LDMyLjRDMjIuNywzOC4zLDE4LDQzLjEsMTgsNDMuM2EyLjEsMi4xLDAsMCwwLDEuNC'+
			'wyLjljMS4yLjMuNy43LDEyLTEwLjZMNDEuOSwyNS4xdjYuOGMuMSw2LjcuMSw2LjguNCw3LjJhMi4xLDIuMSwwLDAsMCwzLjYsMGMuMi0uNC4yLS41LjMtMTAuMVYxOS45YTEuNSwxLjUsMCwwLDAtLjEtLjd2LS41Yy0uNy0xLjEuMS0xLTEwLjktMUMyNy4zLDE3LjcsMjUuMywxNy43LDI0LjksMTcuOVoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._map_scale__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._map_scale__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0ic2NhbGVfYWN0aXZlIiBkYXRhLW5hbWU9InNjYWxlIGFjdGl2ZSI+CiAgPHJlY3QgeT0iMi42IiBoZWlnaHQ9IjU4LjcxIiBmaWxsPSIjMDEwMTAxIiB4PSIyLjYiIHdpZHRoPSI1OC43Ii8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTIzLDEzLjlhMi45LDIuOSwwLDAsMC0xLDQuM2MuOSwxLC43LDEsMTAuMywxSDQxTDI3LjYsMzIuNmMtNy41LDcuNS0xMy41LDEzLjYtMTMuNSwxMy45YTIuNywyLjcsMCwwLDAsMS'+
			'44LDMuN2MxLjUuMy45LjksMTUuMy0xMy42TDQ0LjYsMjMuMnY4LjdjLjEsOC41LjEsOC43LjQsOS4yYTIuOCwyLjgsMCwwLDAsNC42LDBjLjQtLjUuNC0uNi40LTEyLjlWMTUuN2wtLjItLjZjLTEtMS41LjEtMS40LTE0LTEuNEMyNiwxMy43LDIzLjQsMTMuOCwyMywxMy45WiIvPgogPC9nPgo8L3N2Zz4K';
		me._map_scale__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="Map_scale";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_scale.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_scale.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((player.getVariableValue('map_scale_full') == true)) || 
				((player.getVariableValue('map_scale_normal') == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._map_scale.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._map_scale.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._map_scale.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms';
				if (me._map_scale.ggCurrentLogicStateAngle == 0) {
					me._map_scale.ggParameter.a = 180;
					me._map_scale.style[domTransform]=parameterToTransform(me._map_scale.ggParameter);
				}
				else {
					me._map_scale.ggParameter.a = 0;
					me._map_scale.style[domTransform]=parameterToTransform(me._map_scale.ggParameter);
				}
			}
		}
		me._map_scale.onclick=function (e) {
			if (
				(
					((player.getIsMobile() == true)) && 
					((player.getViewerSize().width < 720))
				)
			) {
				player.setVariableValue('map_scale_full', !player.getVariableValue('map_scale_full'));
			}
			if (
				(
					((player.getIsMobile() == true)) && 
					((player.getViewerSize().width < 720))
				)
			) {
				player.setVariableValue('map_hide', true);
			}
			if (
				(
					((player.getIsMobile() == false))
				)
			||
				(
					((player.getIsMobile() == true)) && 
					((player.getViewerSize().width >= 720))
				)
			) {
				player.setVariableValue('map_scale_normal', !player.getVariableValue('map_scale_normal'));
			}
		}
		me._map_scale.onmouseover=function (e) {
			me._map_scale__img.style.visibility='hidden';
			me._map_scale__imgo.style.visibility='inherit';
		}
		me._map_scale.onmouseout=function (e) {
			me._map_scale__img.style.visibility='inherit';
			me._map_scale__imgo.style.visibility='hidden';
		}
		me._map_scale.ggUpdatePosition=function (useTransition) {
		}
		me._map_container.appendChild(me._map_scale);
		el=me._map_hide_ico=document.createElement('div');
		els=me._map_hide_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0iaGlkZV9ub3JtYWwiIGRhdGEtbmFtZT0iaGlkZSBub3JtYWwiPgogIDxyZWN0IGhlaWdodD0iNjQiIGZpbGw9IiMwMTAxMDEiIHdpZHRoPSI2NCIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00Mi4zLDUwbDIuNC0yLjMtNy45LTcuOEwyOSwzMmw3LjgtNy43YzQuMi00LjMsNy43LTcuOCw3LjctNy45YTIyLjcsMjIuNywwLDAsMC0yLjMtMi41bC0yLjMtMi4zTDI5LjYsMjEuOSwxOS4zLDMyLjEsMjkuNSw0Mi4zLD'+
			'M5LjgsNTIuNEExOC45LDE4LjksMCwwLDAsNDIuMyw1MFoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._map_hide_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._map_hide_ico__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBpZD0iaGlkZV9hY3RpdmUiIGRhdGEtbmFtZT0iaGlkZSBhY3RpdmUiPgogIDxyZWN0IGhlaWdodD0iNjQiIGZpbGw9IiMwMTAxMDEiIHdpZHRoPSI2NCIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NCw1My4xbDIuOC0yLjgtOS4yLTkuMUwyOC41LDMybDktOSw5LjEtOS4yYTMxLDMxLDAsMCwwLTIuNy0yLjlMNDEuMiw4LjJsLTEyLDEyLTEyLDExLjlMMjkuMSw0NGM2LjUsNi41LDExLjksMTEuOCwxMiwxMS44QTMxLD'+
			'MxLDAsMCwwLDQ0LDUzLjFaIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._map_hide_ico__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="Map_hide_ico";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_hide_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_hide_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('map_hide') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._map_hide_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._map_hide_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._map_hide_ico.style[domTransition]='';
				if (me._map_hide_ico.ggCurrentLogicStateVisible == 0) {
					me._map_hide_ico.style.visibility="hidden";
					me._map_hide_ico.ggVisible=false;
				}
				else {
					me._map_hide_ico.style.visibility=(Number(me._map_hide_ico.style.opacity)>0||!me._map_hide_ico.style.opacity)?'inherit':'hidden';
					me._map_hide_ico.ggVisible=true;
				}
			}
		}
		me._map_hide_ico.onclick=function (e) {
			player.setVariableValue('map_hide', true);
			player.setVariableValue('map_scale_normal', false);
			player.setVariableValue('map_scale_full', false);
		}
		me._map_hide_ico.onmouseover=function (e) {
			me._map_hide_ico__img.style.visibility='hidden';
			me._map_hide_ico__imgo.style.visibility='inherit';
		}
		me._map_hide_ico.onmouseout=function (e) {
			me._map_hide_ico__img.style.visibility='inherit';
			me._map_hide_ico__imgo.style.visibility='hidden';
		}
		me._map_hide_ico.ggUpdatePosition=function (useTransition) {
		}
		me._map_container.appendChild(me._map_hide_ico);
		me.divSkin.appendChild(me._map_container);
		el=me._rec_off_thumb_menu=document.createElement('div');
		el.ggId="Rec_off_thumb_menu";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.470588);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_off_thumb_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._rec_off_thumb_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('show_menu_thumb') == true)) && 
				((player.getIsMobile() == false)) || 
				((player.getVariableValue('hs_info') == true)) || 
				((player.getVariableValue('hs_info_c') == true)) || 
				((player.getVariableValue('map_4d') == true)) || 
				((player.getVariableValue('callout_gallery') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._rec_off_thumb_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._rec_off_thumb_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._rec_off_thumb_menu.style[domTransition]='opacity 0s';
				if (me._rec_off_thumb_menu.ggCurrentLogicStateAlpha == 0) {
					me._rec_off_thumb_menu.style.visibility=me._rec_off_thumb_menu.ggVisible?'inherit':'hidden';
					me._rec_off_thumb_menu.style.opacity=1;
				}
				else {
					me._rec_off_thumb_menu.style.visibility="hidden";
					me._rec_off_thumb_menu.style.opacity=0;
				}
			}
		}
		me._rec_off_thumb_menu.onclick=function (e) {
			player.setVariableValue('show_menu_thumb', false);
		}
		me._rec_off_thumb_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._rec_off_thumb_menu);
		el=me._container_list_menu=document.createElement('div');
		el.ggId="Container_list_menu";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='left :  - 100%;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 270px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_list_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_list_menu.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == false)) && 
				((player.getVariableValue('show_menu_thumb') == false))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getIsMobile() == false)) && 
				((player.getVariableValue('show_menu_thumb') == true))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getVariableValue('show_menu_thumb') == false))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getVariableValue('show_menu_thumb') == true))
			)
			{
				newLogicStatePosition = 3;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._container_list_menu.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._container_list_menu.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._container_list_menu.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, width 0s, height 0s, opacity 1000ms ease 0ms';
				if (me._container_list_menu.ggCurrentLogicStatePosition == 0) {
					me._container_list_menu.style.left=' - 100%';
					me._container_list_menu.style.top='0px';
				}
				else if (me._container_list_menu.ggCurrentLogicStatePosition == 1) {
					me._container_list_menu.style.left='0%';
					me._container_list_menu.style.top='0%';
				}
				else if (me._container_list_menu.ggCurrentLogicStatePosition == 2) {
					me._container_list_menu.style.left='0%';
					me._container_list_menu.style.top='100%';
				}
				else if (me._container_list_menu.ggCurrentLogicStatePosition == 3) {
					me._container_list_menu.style.left='0%';
					me._container_list_menu.style.top='0%';
				}
				else {
					me._container_list_menu.style.left=' - 100%';
					me._container_list_menu.style.top='0px';
				}
			}
		}
		me._container_list_menu.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height > 1))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width > 480))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width < 480))
			)
			{
				newLogicStateSize = 2;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._container_list_menu.ggCurrentLogicStateSize != newLogicStateSize) {
				me._container_list_menu.ggCurrentLogicStateSize = newLogicStateSize;
				me._container_list_menu.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, width 0s, height 0s, opacity 1000ms ease 0ms';
				if (me._container_list_menu.ggCurrentLogicStateSize == 0) {
					me._container_list_menu.style.width='370px';
					me._container_list_menu.style.height='100%';
					skin.updateSize(me._container_list_menu);
				}
				else if (me._container_list_menu.ggCurrentLogicStateSize == 1) {
					me._container_list_menu.style.width='370px';
					me._container_list_menu.style.height='100%';
					skin.updateSize(me._container_list_menu);
				}
				else if (me._container_list_menu.ggCurrentLogicStateSize == 2) {
					me._container_list_menu.style.width='100%';
					me._container_list_menu.style.height='100%';
					skin.updateSize(me._container_list_menu);
				}
				else {
					me._container_list_menu.style.width='270px';
					me._container_list_menu.style.height='100%';
					skin.updateSize(me._container_list_menu);
				}
			}
		}
		me._container_list_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('show_menu_thumb') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._container_list_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._container_list_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._container_list_menu.style[domTransition]='left 1000ms ease 0ms, top 1000ms ease 0ms, width 0s, height 0s, opacity 1000ms ease 0ms';
				if (me._container_list_menu.ggCurrentLogicStateAlpha == 0) {
					me._container_list_menu.style.visibility=me._container_list_menu.ggVisible?'inherit':'hidden';
					me._container_list_menu.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._container_list_menu.style.opacity == 0.0) { me._container_list_menu.style.visibility="hidden"; } }, 1005);
					me._container_list_menu.style.opacity=0;
				}
			}
		}
		me._container_list_menu.ggUpdatePosition=function (useTransition) {
		}
		el=me._rec_list_menu=document.createElement('div');
		el.ggId="Rec_list_menu";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #253d8f;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_list_menu.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rec_list_menu.ggUpdatePosition=function (useTransition) {
		}
		me._container_list_menu.appendChild(me._rec_list_menu);
		el=me._sel_area_scroll=document.createElement('div');
		els=me._sel_area_scroll__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 36px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 51px;';
		hs+="";
		els.setAttribute('style',hs);
		me._sel_area_scroll.ggScrollByX = function(diffX) {
			if(!me._sel_area_scroll.ggHorScrollVisible || diffX == 0 || me._sel_area_scroll.ggHPercentVisible >= 1.0) return;
			me._sel_area_scroll.ggScrollPosX = (me._sel_area_scroll__horScrollFg.offsetLeft + diffX);
			me._sel_area_scroll.ggScrollPosX = Math.max(me._sel_area_scroll.ggScrollPosX, 0);
			me._sel_area_scroll.ggScrollPosX = Math.min(me._sel_area_scroll.ggScrollPosX, me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
			me._sel_area_scroll__horScrollFg.style.left = me._sel_area_scroll.ggScrollPosX + 'px';
			let percentScrolled = me._sel_area_scroll.ggScrollPosX / (me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
			me._sel_area_scroll__content.style.left = -(Math.round((me._sel_area_scroll.ggContentWidth * (1.0 - me._sel_area_scroll.ggHPercentVisible)) * percentScrolled)) + me._sel_area_scroll.ggContentLeftOffset + 'px';
			me._sel_area_scroll.ggScrollPosXPercent = (me._sel_area_scroll__horScrollFg.offsetLeft / me._sel_area_scroll__horScrollBg.offsetWidth);
		}
		me._sel_area_scroll.ggScrollByXSmooth = function(diffX) {
			if(!me._sel_area_scroll.ggHorScrollVisible || diffX == 0 || me._sel_area_scroll.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._sel_area_scroll.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._sel_area_scroll.ggScrollPosX >= me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth)) {
					me._sel_area_scroll.ggScrollPosX = Math.min(me._sel_area_scroll.ggScrollPosX, me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._sel_area_scroll.ggScrollPosX <= 0)) {
					me._sel_area_scroll.ggScrollPosX = Math.max(me._sel_area_scroll.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._sel_area_scroll__horScrollFg.style.left = me._sel_area_scroll.ggScrollPosX + 'px';
			let percentScrolled = me._sel_area_scroll.ggScrollPosX / (me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
			me._sel_area_scroll__content.style.left = -(Math.round((me._sel_area_scroll.ggContentWidth * (1.0 - me._sel_area_scroll.ggHPercentVisible)) * percentScrolled)) + me._sel_area_scroll.ggContentLeftOffset + 'px';
			me._sel_area_scroll.ggScrollPosXPercent = (me._sel_area_scroll__horScrollFg.offsetLeft / me._sel_area_scroll__horScrollBg.offsetWidth);
			}, 10);
		}
		me._sel_area_scroll.ggScrollByY = function(diffY) {
			if(!me._sel_area_scroll.ggVertScrollVisible || diffY == 0 || me._sel_area_scroll.ggVPercentVisible >= 1.0) return;
			me._sel_area_scroll.ggScrollPosY = (me._sel_area_scroll__vertScrollFg.offsetTop + diffY);
			me._sel_area_scroll.ggScrollPosY = Math.max(me._sel_area_scroll.ggScrollPosY, 0);
			me._sel_area_scroll.ggScrollPosY = Math.min(me._sel_area_scroll.ggScrollPosY, me._sel_area_scroll__vertScrollBg.offsetHeight - me._sel_area_scroll__vertScrollFg.offsetHeight);
			me._sel_area_scroll__vertScrollFg.style.top = me._sel_area_scroll.ggScrollPosY + 'px';
			let percentScrolled = me._sel_area_scroll.ggScrollPosY / (me._sel_area_scroll__vertScrollBg.offsetHeight - me._sel_area_scroll__vertScrollFg.offsetHeight);
			me._sel_area_scroll__content.style.top = -(Math.round((me._sel_area_scroll.ggContentHeight * (1.0 - me._sel_area_scroll.ggVPercentVisible)) * percentScrolled)) + me._sel_area_scroll.ggContentTopOffset + 'px';
			me._sel_area_scroll.ggScrollPosYPercent = (me._sel_area_scroll__vertScrollFg.offsetTop / me._sel_area_scroll__vertScrollBg.offsetHeight);
		}
		me._sel_area_scroll.ggScrollByYSmooth = function(diffY) {
			if(!me._sel_area_scroll.ggVertScrollVisible || diffY == 0 || me._sel_area_scroll.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._sel_area_scroll.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._sel_area_scroll.ggScrollPosY >= me._sel_area_scroll__vertScrollBg.offsetHeight - me._sel_area_scroll__vertScrollFg.offsetHeight)) {
					me._sel_area_scroll.ggScrollPosY = Math.min(me._sel_area_scroll.ggScrollPosY, me._sel_area_scroll__vertScrollBg.offsetHeight - me._sel_area_scroll__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._sel_area_scroll.ggScrollPosY <= 0)) {
					me._sel_area_scroll.ggScrollPosY = Math.max(me._sel_area_scroll.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._sel_area_scroll__vertScrollFg.style.top = me._sel_area_scroll.ggScrollPosY + 'px';
			let percentScrolled = me._sel_area_scroll.ggScrollPosY / (me._sel_area_scroll__vertScrollBg.offsetHeight - me._sel_area_scroll__vertScrollFg.offsetHeight);
			me._sel_area_scroll__content.style.top = -(Math.round((me._sel_area_scroll.ggContentHeight * (1.0 - me._sel_area_scroll.ggVPercentVisible)) * percentScrolled)) + me._sel_area_scroll.ggContentTopOffset + 'px';
			me._sel_area_scroll.ggScrollPosYPercent = (me._sel_area_scroll__vertScrollFg.offsetTop / me._sel_area_scroll__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._sel_area_scroll.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._sel_area_scroll.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._sel_area_scroll.ggHPercentVisible);
					me._sel_area_scroll.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._sel_area_scroll.clientWidth - (me._sel_area_scroll.ggVertScrollVisible ? 6 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._sel_area_scroll.clientWidth - (me._sel_area_scroll.ggVertScrollVisible ? 6 : 0))) * me._sel_area_scroll.ggHPercentVisible);
					me._sel_area_scroll.ggScrollByXSmooth(diffX);
				}
			}
			if (me._sel_area_scroll.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._sel_area_scroll.ggVPercentVisible);
					me._sel_area_scroll.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._sel_area_scroll.clientHeight - (me._sel_area_scroll.ggHorScrollVisible ? 6 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._sel_area_scroll.clientHeight - (me._sel_area_scroll.ggHorScrollVisible ? 6 : 0))) * me._sel_area_scroll.ggVPercentVisible);
					me._sel_area_scroll.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._sel_area_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._sel_area_scroll.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._sel_area_scroll__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_area_scroll.ggDragInertiaX *= 0.65;
					me._sel_area_scroll.ggDragInertiaY *= 0.65;
					me._sel_area_scroll.ggScrollByX(me._sel_area_scroll.ggDragInertiaX);
					me._sel_area_scroll.ggScrollByY(me._sel_area_scroll.ggDragInertiaY);
					if (Math.abs(me._sel_area_scroll.ggDragInertiaX) < 1.0 && Math.abs(me._sel_area_scroll.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._sel_area_scroll__content.ontouchend = null;
				me._sel_area_scroll__content.ontouchmove = null;
				me._sel_area_scroll__content.onpointerup = null;
				me._sel_area_scroll__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._sel_area_scroll__content.onpointerup = me._sel_area_scroll__content.ontouchend;
		}
			me._sel_area_scroll__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._sel_area_scroll.ggDragLastX) * me._sel_area_scroll.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._sel_area_scroll.ggDragLastY) * me._sel_area_scroll.ggVPercentVisible;
				me._sel_area_scroll.ggDragInertiaX = -diffX;
				me._sel_area_scroll.ggDragInertiaY = -diffY;
				me._sel_area_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._sel_area_scroll.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._sel_area_scroll.ggScrollByX(-diffX);
				me._sel_area_scroll.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._sel_area_scroll__content.onpointermove = me._sel_area_scroll__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elHorScrollBg = me._sel_area_scroll__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 248px; height: 6px; background-color: rgba(190,190,190,0.588235); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._sel_area_scroll__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 248px; height: 6px; background-color: rgba(0,170,255,1); pointer-events: auto;');
		me._sel_area_scroll.ggScrollPosX = 0;
		me._sel_area_scroll.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._sel_area_scroll.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_area_scroll.ggDragInertiaX *= 0.65;
					me._sel_area_scroll.ggScrollByX(me._sel_area_scroll.ggDragInertiaX);
					if (Math.abs(me._sel_area_scroll.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._sel_area_scroll.ggDragLastX;
				me._sel_area_scroll.ggDragInertiaX = diffX;
				me._sel_area_scroll.ggDragLastX = e.clientX;
				me._sel_area_scroll.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._sel_area_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._sel_area_scroll.ggDragInertiaX *= 0.65;
					me._sel_area_scroll.ggScrollByX(me._sel_area_scroll.ggDragInertiaX);
					if (Math.abs(me._sel_area_scroll.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._sel_area_scroll.ggDragLastX;
				me._sel_area_scroll.ggDragInertiaX = diffX;
				me._sel_area_scroll.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._sel_area_scroll.ggScrollByX(diffX);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elHorScrollFg.onpointerdown = elHorScrollFg.ontouchstart;
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._sel_area_scroll.ggScrollWidth;
			if (e.offsetX < me._sel_area_scroll.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._sel_area_scroll.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._sel_area_scroll__horScrollBg.getBoundingClientRect();
			var diffX = me._sel_area_scroll.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._sel_area_scroll.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._sel_area_scroll.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._sel_area_scroll.ggScrollByXSmooth(30 * me._sel_area_scroll.ggHPercentVisible * wheelDelta);
		});
		elCornerBg = me._sel_area_scroll__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 6px; height: 6px; background-color: rgba(255,170,0,0);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="sel_area_scroll";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : #253d8f;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='height : 50px;';
		hs+='left : 5px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		hs+='transform: translateX(x);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._sel_area_scroll.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_area_scroll.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height > 1))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width > 480))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width < 480))
			)
			{
				newLogicStateSize = 2;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._sel_area_scroll.ggCurrentLogicStateSize != newLogicStateSize) {
				me._sel_area_scroll.ggCurrentLogicStateSize = newLogicStateSize;
				me._sel_area_scroll.style[domTransition]='width 0s, height 0s';
				if (me._sel_area_scroll.ggCurrentLogicStateSize == 0) {
					me._sel_area_scroll.style.width='350px';
					me._sel_area_scroll.style.height='50px';
					skin.updateSize(me._sel_area_scroll);
				}
				else if (me._sel_area_scroll.ggCurrentLogicStateSize == 1) {
					me._sel_area_scroll.style.width='350px';
					me._sel_area_scroll.style.height='50px';
					skin.updateSize(me._sel_area_scroll);
				}
				else if (me._sel_area_scroll.ggCurrentLogicStateSize == 2) {
					me._sel_area_scroll.style.width='100%';
					me._sel_area_scroll.style.height='50px';
					skin.updateSize(me._sel_area_scroll);
				}
				else {
					me._sel_area_scroll.style.width='250px';
					me._sel_area_scroll.style.height='50px';
					skin.updateSize(me._sel_area_scroll);
				}
			}
		}
		me._sel_area_scroll.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContentWidth = contentWidth;
				this.ggContentHeight = contentHeight;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = -(Math.round(me._sel_area_scroll.ggScrollPosX / me._sel_area_scroll.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._sel_area_scroll__horScrollBg.style.visibility = 'inherit';
				me._sel_area_scroll__horScrollFg.style.visibility = 'inherit';
				me._sel_area_scroll.ggHorScrollVisible = true;
				if(me._sel_area_scroll.ggHorScrollVisible) {
					me._sel_area_scroll.ggAvailableHeight = me._sel_area_scroll.clientHeight - 6;
					if (me._sel_area_scroll.ggVertScrollVisible) {
						me._sel_area_scroll.ggAvailableWidth = me._sel_area_scroll.clientWidth - 6;
						me._sel_area_scroll.ggAvailableWidthWithScale = me._sel_area_scroll.getBoundingClientRect().width - me._sel_area_scroll__horScrollBg.getBoundingClientRect().height;
					} else {
						me._sel_area_scroll.ggAvailableWidth = me._sel_area_scroll.clientWidth;
						me._sel_area_scroll.ggAvailableWidthWithScale = me._sel_area_scroll.getBoundingClientRect().width;
					}
					me._sel_area_scroll__horScrollBg.style.width = me._sel_area_scroll.ggAvailableWidth + 'px';
					me._sel_area_scroll.ggHPercentVisible = contentWidth != 0 ? me._sel_area_scroll.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._sel_area_scroll.ggHPercentVisible > 1.0) me._sel_area_scroll.ggHPercentVisible = 1.0;
					me._sel_area_scroll.ggScrollWidth = Math.round(me._sel_area_scroll__horScrollBg.offsetWidth * me._sel_area_scroll.ggHPercentVisible);
					me._sel_area_scroll__horScrollFg.style.width = me._sel_area_scroll.ggScrollWidth + 'px';
					me._sel_area_scroll.ggScrollPosX = me._sel_area_scroll.ggScrollPosXPercent * me._sel_area_scroll.ggAvailableWidth;
					me._sel_area_scroll.ggScrollPosX = Math.min(me._sel_area_scroll.ggScrollPosX, me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
					me._sel_area_scroll__horScrollFg.style.left = me._sel_area_scroll.ggScrollPosX + 'px';
					if (me._sel_area_scroll.ggHPercentVisible < 1.0) {
						let percentScrolled = me._sel_area_scroll.ggScrollPosX / (me._sel_area_scroll__horScrollBg.offsetWidth - me._sel_area_scroll__horScrollFg.offsetWidth);
						me._sel_area_scroll__content.style.left = -(Math.round((me._sel_area_scroll.ggContentWidth * (1.0 - me._sel_area_scroll.ggHPercentVisible)) * percentScrolled)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._sel_area_scroll.ggAvailableHeight = me._sel_area_scroll.clientHeight;
					me._sel_area_scroll.ggScrollPosX = 0;
					me._sel_area_scroll.ggScrollPosXPercent = 0.0;
					me._sel_area_scroll__content.style.left = this.ggContentLeftOffset + 'px';
				}
				if(horScrollWasVisible != me._sel_area_scroll.ggHorScrollVisible || vertScrollWasVisible != me._sel_area_scroll.ggVertScrollVisible) {
					me.updateSize(me._sel_area_scroll);
					me._sel_area_scroll.ggUpdatePosition();
				}
			}
		}
		el=me._sel_area_clone=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 50;
		el.ggHeight = 30;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._sel_area_clone.callChildLogicBlocks_mouseover = function(){
			if(me._sel_area_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_area_clone.ggInstances.length; i++) {
					if (me._sel_area_clone.ggInstances[i]._sel_area_button && me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_textcolor) {
						me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_textcolor();
					}
					if (me._sel_area_clone.ggInstances[i]._sel_area_button && me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_backgroundcolor) {
						me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		me._sel_area_clone.callChildLogicBlocks_active = function(){
			if(me._sel_area_clone.ggInstances) {
				var i;
				for(i = 0; i < me._sel_area_clone.ggInstances.length; i++) {
					if (me._sel_area_clone.ggInstances[i]._sel_area_button && me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_textcolor) {
						me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_textcolor();
					}
					if (me._sel_area_clone.ggInstances[i]._sel_area_button && me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_backgroundcolor) {
						me._sel_area_clone.ggInstances[i]._sel_area_button.logicBlock_backgroundcolor();
					}
				}
			}
		}
		el.ggAutoPosition = function(init) {
			var currXPos = 0;
			var numElements = me._sel_area_clone.ggInstances.length;
			var currElement = 0;
			for (var i=0; i<me._sel_area_clone.ggNumCols; i++) {
				var colMaxWidth = 0;
				for (var j=0; j<me._sel_area_clone.ggNumRows; j++) {
					if (numElements>currElement) {
						me._sel_area_clone.childNodes[currElement].style['left'] = currXPos + 'px';
						me._sel_area_clone.childNodes[currElement].style['width'] ='0px';
						colMaxWidth = Math.max(colMaxWidth, me._sel_area_clone.childNodes[currElement].scrollWidth);
						me._sel_area_clone.childNodes[currElement].style['width'] = colMaxWidth + 'px';
					}
					currElement++;
				}
				currXPos += colMaxWidth;
			}
		}
		el.ggUpdate = function(filter) {
			if(me._sel_area_clone.ggUpdating == true) return;
			me._sel_area_clone.ggUpdating = true;
			var el=me._sel_area_clone;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._sel_area_clone.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var firstNode;
			for (var i=0; i < el.ggTagTable.length; i++) {
				var cItem = el.ggTagTable[i];
				firstNode = '';
				cItem.nodecount = 0;
				for (var j=0; j < tourNodes.length; j++) {
					var nodeData = player.getNodeUserdata(tourNodes[j]);
					if ((nodeData['tags'].indexOf(cItem.tag) != -1) || (cItem.tag=='')) {
						var passed = true;
						if (filter.length > 0) {
							for (var k=0; k < filter.length; k++) {
								if (nodeData['tags'].indexOf(filter[k]) == -1) passed = false;
							}
						}
						if (passed) {
							cItem.nodecount++;
							if (firstNode == '') firstNode = tourNodes[j];
						}
					}
				}
				cItem.firstnode=firstNode;
				if (cItem.nodecount == 0) continue;
				var nodeId = {};
				nodeId['tag'] = cItem.tag;
				nodeId['title'] = cItem.title;
				nodeId['nodecount'] = cItem.nodecount;
				nodeId['firstnode'] = cItem.firstnode;
				var parameter={};
				parameter.top=(row * me._sel_area_clone.ggHeight) + 'px';
				parameter.left=(column * me._sel_area_clone.ggWidth) + 'px';
				parameter.width=me._sel_area_clone.ggWidth + 'px';
				parameter.height=me._sel_area_clone.ggHeight + 'px';
				parameter.index=currentIndex;
				var inst = new SkinCloner_sel_area_clone_Class(nodeId, me, el, parameter);
				currentIndex++;
				inst.__div.style['width'] = '0px';
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
			}
			me._sel_area_clone.callChildLogicBlocks_mouseover();
			me._sel_area_clone.callChildLogicBlocks_active();
			me._sel_area_clone.ggAutoPosition(true);
			me._sel_area_clone.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._sel_area_clone.parentNode.classList.contains('ggskin_subelement') && me._sel_area_clone.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._sel_area_clone.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggTagTable = [
			{tag:"pic",title:"T\u1ea5t c\u1ea3"},
			{tag:"Tang5",title:"T\u1ea7ng 5"},
			{tag:"Tang6",title:"T\u1ea7ng 6"},
			];
		el.ggId="sel_area_clone";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 30px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._sel_area_clone.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_area_clone.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._sel_area_clone.childNodes.length; i++) {
				var child=me._sel_area_clone.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._sel_area_clone.ggUpdatePosition=function (useTransition) {
				me._sel_area_clone.ggUpdate();
		}
		me._sel_area_clone.ggNodeChange=function () {
			me._sel_area_clone.ggUpdateConditionNodeChange();
		}
		me._sel_area_scroll__content.appendChild(me._sel_area_clone);
		me._container_list_menu.appendChild(me._sel_area_scroll);
		el=me._scrollarea_list_thumb=document.createElement('div');
		els=me._scrollarea_list_thumb__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		el.ggDragInertiaX = 0;
		el.ggDragInertiaY = 0;
		el.ggVPercentVisible = 1.0;
		el.ggHPercentVisible = 1.0;
		hs ='';
		hs+='height : 129px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 259px;';
		hs+="";
		els.setAttribute('style',hs);
		me._scrollarea_list_thumb.ggScrollByX = function(diffX) {
			if(!me._scrollarea_list_thumb.ggHorScrollVisible || diffX == 0 || me._scrollarea_list_thumb.ggHPercentVisible >= 1.0) return;
			me._scrollarea_list_thumb.ggScrollPosX = (me._scrollarea_list_thumb__horScrollFg.offsetLeft + diffX);
			me._scrollarea_list_thumb.ggScrollPosX = Math.max(me._scrollarea_list_thumb.ggScrollPosX, 0);
			me._scrollarea_list_thumb.ggScrollPosX = Math.min(me._scrollarea_list_thumb.ggScrollPosX, me._scrollarea_list_thumb__horScrollBg.offsetWidth - me._scrollarea_list_thumb__horScrollFg.offsetWidth);
			me._scrollarea_list_thumb__horScrollFg.style.left = me._scrollarea_list_thumb.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea_list_thumb.ggScrollPosX / (me._scrollarea_list_thumb__horScrollBg.offsetWidth - me._scrollarea_list_thumb__horScrollFg.offsetWidth);
			me._scrollarea_list_thumb__content.style.left = -(Math.round((me._scrollarea_list_thumb.ggContentWidth * (1.0 - me._scrollarea_list_thumb.ggHPercentVisible)) * percentScrolled)) + me._scrollarea_list_thumb.ggContentLeftOffset + 'px';
			me._scrollarea_list_thumb.ggScrollPosXPercent = (me._scrollarea_list_thumb__horScrollFg.offsetLeft / me._scrollarea_list_thumb__horScrollBg.offsetWidth);
		}
		me._scrollarea_list_thumb.ggScrollByXSmooth = function(diffX) {
			if(!me._scrollarea_list_thumb.ggHorScrollVisible || diffX == 0 || me._scrollarea_list_thumb.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._scrollarea_list_thumb.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._scrollarea_list_thumb.ggScrollPosX >= me._scrollarea_list_thumb__horScrollBg.offsetWidth - me._scrollarea_list_thumb__horScrollFg.offsetWidth)) {
					me._scrollarea_list_thumb.ggScrollPosX = Math.min(me._scrollarea_list_thumb.ggScrollPosX, me._scrollarea_list_thumb__horScrollBg.offsetWidth - me._scrollarea_list_thumb__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._scrollarea_list_thumb.ggScrollPosX <= 0)) {
					me._scrollarea_list_thumb.ggScrollPosX = Math.max(me._scrollarea_list_thumb.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._scrollarea_list_thumb__horScrollFg.style.left = me._scrollarea_list_thumb.ggScrollPosX + 'px';
			let percentScrolled = me._scrollarea_list_thumb.ggScrollPosX / (me._scrollarea_list_thumb__horScrollBg.offsetWidth - me._scrollarea_list_thumb__horScrollFg.offsetWidth);
			me._scrollarea_list_thumb__content.style.left = -(Math.round((me._scrollarea_list_thumb.ggContentWidth * (1.0 - me._scrollarea_list_thumb.ggHPercentVisible)) * percentScrolled)) + me._scrollarea_list_thumb.ggContentLeftOffset + 'px';
			me._scrollarea_list_thumb.ggScrollPosXPercent = (me._scrollarea_list_thumb__horScrollFg.offsetLeft / me._scrollarea_list_thumb__horScrollBg.offsetWidth);
			}, 10);
		}
		me._scrollarea_list_thumb.ggScrollByY = function(diffY) {
			if(!me._scrollarea_list_thumb.ggVertScrollVisible || diffY == 0 || me._scrollarea_list_thumb.ggVPercentVisible >= 1.0) return;
			me._scrollarea_list_thumb.ggScrollPosY = (me._scrollarea_list_thumb__vertScrollFg.offsetTop + diffY);
			me._scrollarea_list_thumb.ggScrollPosY = Math.max(me._scrollarea_list_thumb.ggScrollPosY, 0);
			me._scrollarea_list_thumb.ggScrollPosY = Math.min(me._scrollarea_list_thumb.ggScrollPosY, me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
			me._scrollarea_list_thumb__vertScrollFg.style.top = me._scrollarea_list_thumb.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea_list_thumb.ggScrollPosY / (me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
			me._scrollarea_list_thumb__content.style.top = -(Math.round((me._scrollarea_list_thumb.ggContentHeight * (1.0 - me._scrollarea_list_thumb.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_list_thumb.ggContentTopOffset + 'px';
			me._scrollarea_list_thumb.ggScrollPosYPercent = (me._scrollarea_list_thumb__vertScrollFg.offsetTop / me._scrollarea_list_thumb__vertScrollBg.offsetHeight);
		}
		me._scrollarea_list_thumb.ggScrollByYSmooth = function(diffY) {
			if(!me._scrollarea_list_thumb.ggVertScrollVisible || diffY == 0 || me._scrollarea_list_thumb.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._scrollarea_list_thumb.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._scrollarea_list_thumb.ggScrollPosY >= me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight)) {
					me._scrollarea_list_thumb.ggScrollPosY = Math.min(me._scrollarea_list_thumb.ggScrollPosY, me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._scrollarea_list_thumb.ggScrollPosY <= 0)) {
					me._scrollarea_list_thumb.ggScrollPosY = Math.max(me._scrollarea_list_thumb.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._scrollarea_list_thumb__vertScrollFg.style.top = me._scrollarea_list_thumb.ggScrollPosY + 'px';
			let percentScrolled = me._scrollarea_list_thumb.ggScrollPosY / (me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
			me._scrollarea_list_thumb__content.style.top = -(Math.round((me._scrollarea_list_thumb.ggContentHeight * (1.0 - me._scrollarea_list_thumb.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_list_thumb.ggContentTopOffset + 'px';
			me._scrollarea_list_thumb.ggScrollPosYPercent = (me._scrollarea_list_thumb__vertScrollFg.offsetTop / me._scrollarea_list_thumb__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._scrollarea_list_thumb.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._scrollarea_list_thumb.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._scrollarea_list_thumb.ggHPercentVisible);
					me._scrollarea_list_thumb.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._scrollarea_list_thumb.clientWidth - (me._scrollarea_list_thumb.ggVertScrollVisible ? 4 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._scrollarea_list_thumb.clientWidth - (me._scrollarea_list_thumb.ggVertScrollVisible ? 4 : 0))) * me._scrollarea_list_thumb.ggHPercentVisible);
					me._scrollarea_list_thumb.ggScrollByXSmooth(diffX);
				}
			}
			if (me._scrollarea_list_thumb.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._scrollarea_list_thumb.ggVPercentVisible);
					me._scrollarea_list_thumb.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._scrollarea_list_thumb.clientHeight - (me._scrollarea_list_thumb.ggHorScrollVisible ? 4 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._scrollarea_list_thumb.clientHeight - (me._scrollarea_list_thumb.ggHorScrollVisible ? 4 : 0))) * me._scrollarea_list_thumb.ggVPercentVisible);
					me._scrollarea_list_thumb.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._scrollarea_list_thumb.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._scrollarea_list_thumb.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._scrollarea_list_thumb__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea_list_thumb.ggDragInertiaX *= 0.65;
					me._scrollarea_list_thumb.ggDragInertiaY *= 0.65;
					me._scrollarea_list_thumb.ggScrollByX(me._scrollarea_list_thumb.ggDragInertiaX);
					me._scrollarea_list_thumb.ggScrollByY(me._scrollarea_list_thumb.ggDragInertiaY);
					if (Math.abs(me._scrollarea_list_thumb.ggDragInertiaX) < 1.0 && Math.abs(me._scrollarea_list_thumb.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._scrollarea_list_thumb__content.ontouchend = null;
				me._scrollarea_list_thumb__content.ontouchmove = null;
				me._scrollarea_list_thumb__content.onpointerup = null;
				me._scrollarea_list_thumb__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._scrollarea_list_thumb__content.onpointerup = me._scrollarea_list_thumb__content.ontouchend;
		}
			me._scrollarea_list_thumb__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = ((t ? t[0].clientX : e.clientX) - me._scrollarea_list_thumb.ggDragLastX) * me._scrollarea_list_thumb.ggHPercentVisible;
				var diffY = ((t ? t[0].clientY : e.clientY) - me._scrollarea_list_thumb.ggDragLastY) * me._scrollarea_list_thumb.ggVPercentVisible;
				me._scrollarea_list_thumb.ggDragInertiaX = -diffX;
				me._scrollarea_list_thumb.ggDragInertiaY = -diffY;
				me._scrollarea_list_thumb.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._scrollarea_list_thumb.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scrollarea_list_thumb.ggScrollByX(-diffX);
				me._scrollarea_list_thumb.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._scrollarea_list_thumb__content.onpointermove = me._scrollarea_list_thumb__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._scrollarea_list_thumb__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 4px; height: 830px; background-color: rgba(0,61,89,0); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._scrollarea_list_thumb__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 4px; height: 830px; background-color: rgba(0,170,255,1); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._scrollarea_list_thumb.ggScrollPosY = 0;
		me._scrollarea_list_thumb.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._scrollarea_list_thumb.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea_list_thumb.ggDragInertiaY *= 0.65;
					me._scrollarea_list_thumb.ggScrollByY(me._scrollarea_list_thumb.ggDragInertiaY);
					if (Math.abs(me._scrollarea_list_thumb.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._scrollarea_list_thumb.ggDragLastY;
				me._scrollarea_list_thumb.ggDragInertiaY = diffY;
				me._scrollarea_list_thumb.ggDragLastY = e.clientY;
				me._scrollarea_list_thumb.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._scrollarea_list_thumb.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._scrollarea_list_thumb.ggDragInertiaY *= 0.65;
					me._scrollarea_list_thumb.ggScrollByY(me._scrollarea_list_thumb.ggDragInertiaY);
					if (Math.abs(me._scrollarea_list_thumb.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._scrollarea_list_thumb.ggDragLastY;
				me._scrollarea_list_thumb.ggDragInertiaY = diffY;
				me._scrollarea_list_thumb.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._scrollarea_list_thumb.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._scrollarea_list_thumb.ggScrollHeight;
			if (e.offsetY < me._scrollarea_list_thumb.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrollarea_list_thumb.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._scrollarea_list_thumb__vertScrollBg.getBoundingClientRect();
			var diffY = me._scrollarea_list_thumb.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._scrollarea_list_thumb.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._scrollarea_list_thumb.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._scrollarea_list_thumb.ggScrollByYSmooth(30 * me._scrollarea_list_thumb.ggVPercentVisible * wheelDelta);
		});
		elCornerBg = me._scrollarea_list_thumb__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 4px; height: 4px; background-color: rgba(255,255,255,0);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="Scrollarea_list_thumb";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='background : rgba(0,61,89,0);';
		hs+='border : 0px solid #000000;';
		hs+='height : calc(100%  -  90px);';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 40px;';
		hs+='visibility : inherit;';
		hs+='width : 270px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._scrollarea_list_thumb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._scrollarea_list_thumb.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._scrollarea_list_thumb.ggCurrentLogicStateSize != newLogicStateSize) {
				me._scrollarea_list_thumb.ggCurrentLogicStateSize = newLogicStateSize;
				me._scrollarea_list_thumb.style[domTransition]='width 0s, height 0s';
				if (me._scrollarea_list_thumb.ggCurrentLogicStateSize == 0) {
					me._scrollarea_list_thumb.style.width='370px';
					me._scrollarea_list_thumb.style.height='calc(100%  -  90px)';
					skin.updateSize(me._scrollarea_list_thumb);
				}
				else {
					me._scrollarea_list_thumb.style.width='270px';
					me._scrollarea_list_thumb.style.height='calc(100%  -  90px)';
					me._scrollarea_list_thumb.style.height='calc(100%  -  90px)';
					skin.updateSize(me._scrollarea_list_thumb);
				}
			}
		}
		me._scrollarea_list_thumb.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				this.ggContentWidth = 0;
				this.ggContentHeight = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContentWidth = contentWidth;
				this.ggContentHeight = contentHeight;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.marginLeft = '0px';
				this.ggContent.style.top = -(Math.round(me._scrollarea_list_thumb.ggScrollPosY / me._scrollarea_list_thumb.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._scrollarea_list_thumb__vertScrollBg.style.visibility = 'inherit';
				me._scrollarea_list_thumb__vertScrollFg.style.visibility = 'inherit';
				me._scrollarea_list_thumb.ggVertScrollVisible = true;
				if(me._scrollarea_list_thumb.ggVertScrollVisible) {
					me._scrollarea_list_thumb.ggAvailableWidth = me._scrollarea_list_thumb.clientWidth - 4;
					if (me._scrollarea_list_thumb.ggHorScrollVisible) {
						me._scrollarea_list_thumb.ggAvailableHeight = me._scrollarea_list_thumb.clientHeight - 4;
						me._scrollarea_list_thumb.ggAvailableHeightWithScale = me._scrollarea_list_thumb.getBoundingClientRect().height - me._scrollarea_list_thumb__vertScrollBg.getBoundingClientRect().width;
						me._scrollarea_list_thumb__cornerBg.style.visibility = 'inherit';
					} else {
						me._scrollarea_list_thumb.ggAvailableHeight = me._scrollarea_list_thumb.clientHeight;
						me._scrollarea_list_thumb.ggAvailableHeightWithScale = me._scrollarea_list_thumb.getBoundingClientRect().height;
						me._scrollarea_list_thumb__cornerBg.style.visibility = 'hidden';
					}
					me._scrollarea_list_thumb__vertScrollBg.style.height = me._scrollarea_list_thumb.ggAvailableHeight + 'px';
					me._scrollarea_list_thumb.ggVPercentVisible = contentHeight != 0 ? me._scrollarea_list_thumb.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._scrollarea_list_thumb.ggVPercentVisible > 1.0) me._scrollarea_list_thumb.ggVPercentVisible = 1.0;
					me._scrollarea_list_thumb.ggScrollHeight =  Math.round(me._scrollarea_list_thumb__vertScrollBg.offsetHeight * me._scrollarea_list_thumb.ggVPercentVisible);
					me._scrollarea_list_thumb__vertScrollFg.style.height = me._scrollarea_list_thumb.ggScrollHeight + 'px';
					me._scrollarea_list_thumb.ggScrollPosY = me._scrollarea_list_thumb.ggScrollPosYPercent * me._scrollarea_list_thumb.ggAvailableHeight;
					me._scrollarea_list_thumb.ggScrollPosY = Math.min(me._scrollarea_list_thumb.ggScrollPosY, me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
					me._scrollarea_list_thumb__vertScrollFg.style.top = me._scrollarea_list_thumb.ggScrollPosY + 'px';
					if (me._scrollarea_list_thumb.ggVPercentVisible < 1.0) {
						let percentScrolled = me._scrollarea_list_thumb.ggScrollPosY / (me._scrollarea_list_thumb__vertScrollBg.offsetHeight - me._scrollarea_list_thumb__vertScrollFg.offsetHeight);
						me._scrollarea_list_thumb__content.style.top = -(Math.round((me._scrollarea_list_thumb.ggContentHeight * (1.0 - me._scrollarea_list_thumb.ggVPercentVisible)) * percentScrolled)) + me._scrollarea_list_thumb.ggContentTopOffset + 'px';
					}
				} else {
					me._scrollarea_list_thumb.ggAvailableWidth = me._scrollarea_list_thumb.clientWidth;
					me._scrollarea_list_thumb.ggScrollPosY = 0;
					me._scrollarea_list_thumb.ggScrollPosYPercent = 0.0;
					me._scrollarea_list_thumb__content.style.top = this.ggContentTopOffset + 'px';
					me._scrollarea_list_thumb__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._scrollarea_list_thumb.ggHorScrollVisible || vertScrollWasVisible != me._scrollarea_list_thumb.ggVertScrollVisible) {
					me.updateSize(me._scrollarea_list_thumb);
					me._scrollarea_list_thumb.ggUpdatePosition();
				}
			}
		}
		el=me._cloner_thumb=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 250;
		el.ggHeight = 130;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._cloner_thumb.callChildLogicBlocks_changenode = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._tt_thumb && me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_text) {
						me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_text();
					}
				}
			}
		}
		me._cloner_thumb.callChildLogicBlocks_configloaded = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._rec_clone_thumb && me._cloner_thumb.ggInstances[i]._rec_clone_thumb.logicBlock_size) {
						me._cloner_thumb.ggInstances[i]._rec_clone_thumb.logicBlock_size();
					}
					if (me._cloner_thumb.ggInstances[i]._nodeimage_thumb && me._cloner_thumb.ggInstances[i]._nodeimage_thumb.logicBlock_size) {
						me._cloner_thumb.ggInstances[i]._nodeimage_thumb.logicBlock_size();
					}
					if (me._cloner_thumb.ggInstances[i]._tt_thumb && me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_size) {
						me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_size();
					}
				}
			}
		}
		me._cloner_thumb.callChildLogicBlocks_mouseover = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._rec_active && me._cloner_thumb.ggInstances[i]._rec_active.logicBlock_visible) {
						me._cloner_thumb.ggInstances[i]._rec_active.logicBlock_visible();
					}
				}
			}
		}
		me._cloner_thumb.callChildLogicBlocks_active = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._rec_active && me._cloner_thumb.ggInstances[i]._rec_active.logicBlock_visible) {
						me._cloner_thumb.ggInstances[i]._rec_active.logicBlock_visible();
					}
					if (me._cloner_thumb.ggInstances[i]._check && me._cloner_thumb.ggInstances[i]._check.logicBlock_visible) {
						me._cloner_thumb.ggInstances[i]._check.logicBlock_visible();
					}
				}
			}
		}
		me._cloner_thumb.callChildLogicBlocks_changevisitednodes = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._check && me._cloner_thumb.ggInstances[i]._check.logicBlock_visible) {
						me._cloner_thumb.ggInstances[i]._check.logicBlock_visible();
					}
				}
			}
		}
		me._cloner_thumb.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._cloner_thumb.ggInstances) {
				var i;
				for(i = 0; i < me._cloner_thumb.ggInstances.length; i++) {
					if (me._cloner_thumb.ggInstances[i]._tt_thumb && me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_text) {
						me._cloner_thumb.ggInstances[i]._tt_thumb.logicBlock_text();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._cloner_thumb.ggUpdating == true) return;
			me._cloner_thumb.ggUpdating = true;
			var el=me._cloner_thumb;
			var curNumCols = 0;
			curNumCols = me._cloner_thumb.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._cloner_thumb.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._cloner_thumb.ggHeight) + 'px';
				parameter.left=(column * me._cloner_thumb.ggWidth) + 'px';
				parameter.width=me._cloner_thumb.ggWidth + 'px';
				parameter.height=me._cloner_thumb.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_cloner_thumb_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._cloner_thumb.callChildLogicBlocks_changenode();
			me._cloner_thumb.callChildLogicBlocks_configloaded();
			me._cloner_thumb.callChildLogicBlocks_mouseover();
			me._cloner_thumb.callChildLogicBlocks_active();
			me._cloner_thumb.callChildLogicBlocks_changevisitednodes();
			me._cloner_thumb.callChildLogicBlocks_activehotspotchanged();
			me._cloner_thumb.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._cloner_thumb.parentNode.classList.contains('ggskin_subelement') && me._cloner_thumb.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._cloner_thumb.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "pic";
		el.ggId="Cloner_thumb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 130px;';
		hs+='left : 10px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._cloner_thumb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._cloner_thumb.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._cloner_thumb.ggCurrentLogicStateSize != newLogicStateSize) {
				me._cloner_thumb.ggCurrentLogicStateSize = newLogicStateSize;
				me._cloner_thumb.style[domTransition]='width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._cloner_thumb.ggCurrentLogicStateSize == 0) {
					me._cloner_thumb.ggWidth=350;
					me._cloner_thumb.ggHeight=170;
					me._cloner_thumb.ggUpdate();
					setTimeout(function() {skin.updateSize(me._cloner_thumb);}, 500);
				}
				else {
					me._cloner_thumb.ggWidth=250;
					me._cloner_thumb.ggHeight=130;
					me._cloner_thumb.ggUpdate();
					setTimeout(function() {skin.updateSize(me._cloner_thumb);}, 500);
				}
			}
		}
		me._cloner_thumb.ggCurrentLogicStateSize = -1;
		me._cloner_thumb.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._cloner_thumb.childNodes.length; i++) {
				var child=me._cloner_thumb.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._cloner_thumb.ggUpdatePosition=function (useTransition) {
				me._cloner_thumb.ggUpdate();
		}
		me._cloner_thumb.ggNodeChange=function () {
			me._cloner_thumb.ggUpdateConditionNodeChange();
		}
		me._scrollarea_list_thumb__content.appendChild(me._cloner_thumb);
		me._container_list_menu.appendChild(me._scrollarea_list_thumb);
		el=me._tt_list_head=document.createElement('div');
		els=me._tt_list_head__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_list_head";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text test_tt";
		el.ggType='text';
		hs ='';
		hs+='z-index: -1;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 40px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,170,0,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+="display: flex; align-items: center; justify-content: center; padding: 5px 5px 5px 5px;";
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_list_head.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_list_head.onclick=function (e) {
			player.setVariableValue('show_menu_thumb', true);
		}
		me._tt_list_head.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_list_menu.appendChild(me._tt_list_head);
		el=me._close_menu_mobile=document.createElement('div');
		els=me._close_menu_mobile__img=document.createElement('img');
		els.className='ggskin ggskin_close_menu_mobile';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADKklEQVR4nO1bu24UQRCs47uIiR1iGSKEnJBgXgaE72zOYIF4moyAGAI+gAxifgcioAiOk4711GzPbs/j5GupA3t3e7pqZnt6um8nJHGe5UJtB2rLhoDaDtSWDQGRazsAPgDYLuRLDtnCAsM1AJPgHSRDusP/5am4r2V90MGwG7pPPfyJZ+WwAVBWvR3w/3MKAZcDBkjySQPg+vS+8P16CgH4BzYk8wZAKr0rfD4lOUklACRnwuDjBsBawb+IPWcxfCwMt7QSugFvKW/7nrUOcCQGmDYAfk/49tryfMpAioSaW6Sa+VdWG6kDKhJqbJGhrY40zvxQAkDyQAx8UhC8mvnnqbaGOqAC41EB8HfE2L0Bz5MAUG+ROZOlfTFm8sx7EADqZOm4IPjTMXY9HD'+
			'sUjnm+DmrZvxxr28vBuXDQYyWogPfGw3cvAmIkHIyweTMneG8CQB0YhyRLauajuX1tAmIrISVZUkmO28znJAAkHwkAlpWgZv5ZDl9zEQDqLTJ2lFZH2kFJTm0CQB0TQkfpe+LewUlOCwTEVsJqxqjKWNlmviQBoD5F7pO8Ia6Zj7TrQAC4ePetknSkXRcCQH2KXJXsy74mAeAi2P0KAP/DCnXGGr3BH5FrP4t5sZTCjKtovypFmy+ll75Vir0KpcCrDG9OvSqKNF9KgLc0LdTukL3knht8Sula5QnTdSVgSNOiePMlF3hVybEUMNXZYbouBHg0LVTzxX0leIP3bFoUab54gs9xnleVJbe+gxd41bTwqOFlbb54gFdbnWf1NlvzZaxjD4VjOc7zqto8KjCOceiWcMi9dG0gYVqaAJW/j+7VGVS9DoNOkUMcUL/JGdWl'+
			'TVS3ZMlr5rM0LXp0TPNlEAHFmxYGVcmS+Sg9FnzWpoVRVdpsKqpYBlDLvkjd3qhqJfQGxj7DKslpCfxSB/2EL2ZQJTktgu8jQQZGZWhLGKoZ8KyqXocrKQR8DBgokeR46Szgf/CDCdUY+dL5+x2AvcwtCk+ZATjp/O9r6MYJKb8c3QVwEcA3AO+9PCssVwFcAvAdi0n83b0hRsC5kM13g7UdqC0bAmo7UFv+AlU2teGQNem7AAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_menu_mobile";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_menu_mobile.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_menu_mobile.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._close_menu_mobile.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._close_menu_mobile.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._close_menu_mobile.style[domTransition]='';
				if (me._close_menu_mobile.ggCurrentLogicStateVisible == 0) {
					me._close_menu_mobile.style.visibility=(Number(me._close_menu_mobile.style.opacity)>0||!me._close_menu_mobile.style.opacity)?'inherit':'hidden';
					me._close_menu_mobile.ggVisible=true;
				}
				else {
					me._close_menu_mobile.style.visibility="hidden";
					me._close_menu_mobile.ggVisible=false;
				}
			}
		}
		me._close_menu_mobile.onclick=function (e) {
			player.setVariableValue('show_menu_thumb', false);
		}
		me._close_menu_mobile.ggUpdatePosition=function (useTransition) {
		}
		me._container_list_menu.appendChild(me._close_menu_mobile);
		me.divSkin.appendChild(me._container_list_menu);
		el=me._shade=document.createElement('div');
		el.ggId="shade";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.627451);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._shade.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._shade.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('open_popup') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._shade.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._shade.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._shade.style[domTransition]='opacity 500ms ease 0ms';
				if (me._shade.ggCurrentLogicStateAlpha == 0) {
					me._shade.style.visibility=me._shade.ggVisible?'inherit':'hidden';
					me._shade.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._shade.style.opacity == 0.0) { me._shade.style.visibility="hidden"; } }, 505);
					me._shade.style.opacity=0;
				}
			}
		}
		me._shade.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._shade);
		el=me._popup=document.createElement('div');
		el.ggId="popup";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+='background : #3b3b3b;';
		hs+='border : 0px solid rgba(0,0,0,0.705882);';
		hs+='cursor : default;';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._popup.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('gallery_full') == 1)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._popup.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._popup.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._popup.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup.ggCurrentLogicStatePosition == 0) {
					me._popup.style.left='0%';
					me._popup.style.top='0%';
				}
				else {
					me._popup.style.left='10%';
					me._popup.style.top='10%';
				}
			}
		}
		me._popup.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getVariableValue('gallery_full') == 1)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getVariableValue('gallery_full') == 0))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._popup.ggCurrentLogicStateSize != newLogicStateSize) {
				me._popup.ggCurrentLogicStateSize = newLogicStateSize;
				me._popup.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup.ggCurrentLogicStateSize == 0) {
					me._popup.style.width='100%';
					me._popup.style.height='100%';
					setTimeout(function() {skin.updateSize(me._popup);}, 500);
				}
				else if (me._popup.ggCurrentLogicStateSize == 1) {
					me._popup.style.width='80%';
					me._popup.style.height='80%';
					setTimeout(function() {skin.updateSize(me._popup);}, 500);
				}
				else {
					me._popup.style.width='80%';
					me._popup.style.height='80%';
					setTimeout(function() {skin.updateSize(me._popup);}, 500);
				}
			}
		}
		me._popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('open_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup.ggCurrentLogicStateVisible == 0) {
					me._popup.style.visibility=(Number(me._popup.style.opacity)>0||!me._popup.style.opacity)?'inherit':'hidden';
					me._popup.ggVisible=true;
				}
				else {
					me._popup.style.visibility="hidden";
					me._popup.ggVisible=false;
				}
			}
		}
		me._popup.ggUpdatePosition=function (useTransition) {
		}
		el=me._popup_frame=document.createElement('div');
		els=me._popup_frame__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="popup frame";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 3px solid #00aaff;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._popup_frame.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_frame.ggUpdatePosition=function (useTransition) {
		}
		el=me._fullscreen_gallery_off=document.createElement('div');
		els=me._fullscreen_gallery_off__img=document.createElement('img');
		els.className='ggskin ggskin_fullscreen_gallery_off';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAFlUlEQVRogdWa3U9TZxzHP8/hZS62ph00aCIoA5QSkkqoTSDRDQmUK+sSvdHMm12LqbcsMUaum/gP7ELCjZLoLkyGgAQ3IcHiqGEob0NhGyOlKbGnmS/0nF2c0+VY2tJCoe6bcHGe5zy/8+mTH+f5vRyhqio7VCFQARwByoASwAQU6/PvARkIAavAa2AJ2NjJQ8V2wIUQqKrqAOqA49t89gwwLYQIZLtQVdVtgZ9Cgz0MoCiKEgwG1+bm5lZfvHix7vf7IxMTE/+8evVqA+Do0aOFjY2NnzudTrPdbrfU1NSU2Wy2UkmSJN3eH8CMEOLn3QK3A81AOUA4HA4/fvx47ubNm8sTExPvMzUC0NDQUHz9+vXy06dP11itVqs+vAyMCSGmcwnuARoA1tfXwz'+
			'09Pc+9Xu9fsVgsG95NKigowOfzHbp8+bLDYrHEf8CvQogfdwpuAr4BqhRFiQ0ODgbOnz8/G4lEdvwfbZTZbBZ379491tbW5pAkqQBYAO4LISKpwKVkE7oswEWgSpbliNfrHXC73TO5hgaIRCJqR0fHjNfrHZBlOQJUARdVVbWkWpNqx03AJeBQKBQKnT17dmR0dPRdroGTyeVyFT948ODr0tLSEmAF6BVCyMZ70rnKt0DV2tpaqKmp6dH8/PyO3rnZqrq6unBsbOyMDr8ghOgxzqdyFQ+6e3g8npG9hgaYn5/f8Hg8I3G3UVXVk3hPIrgdaFAUJdbV1fVkr9wjmUZHR991dXU9URQlBjSoqmo3zie6yndA+cOHD5+53e6ZvQRNpf7+/tr29vYGYEkI8QNs9vFTQOv6+nq4oqKifzfeHtuR2WwWS0tLHRaLxQIMCiF+'+
			'SfTx4wA9PT3PPxVo0F6Vvb298XimNj4e3/ETwLlwOBy22Ww/pTsRVVV9mWw8Go1OmEymS+kgZFnu3b9/f2OyOSFEbbJx0E7YYDDYoYcH94HJ+I7XAQwPD8/u4BgX2124lWKxGMPDw7P6ZR1oO14IfK8oSszhcNybmpr6kM5IfMfT7VA2ytRefX19USAQ+EYPCboltCSAYDAY2go6n5qamvoQDAZD+mWFhJa5MDc3t5o/rMxkYDwioaVbTE9Pr2eyOBqNTkSj0We5gsnGnoGxTELLEfH7/W8yWWwymS6ZTKaL28PcmT0DY4mEFgkSCATe5gpmt2RgNEno2fjCwsKeB1PZysBYnC6R+KQlodU9qKqqKswzy5YyML6X0Io1OByOfflDykwGRllCqzDhdDoPZLJYluVeWZZ7cwWTjT0DY6gQrSxWW1dXZ0ErzqRVqiBpu8'+
			'rGns4IsCqh1fKoqakpyyXQbsjA+FpCK0Bis9lK6uvri/KHlV52u73IZrOV6JdLElrVdFaSpIIbN26UZ2pIVdWXxr9M/FSW5d7EdZk+r7u7u1yPDOeAjfh7fBqgpaWlJlNDSbRr8Th8xPYbaLVtgEnAabVaD/t8voPXrl37OyXdDuLwrTKkVPL5fAetVusXwJ9CiMnEZPkroOUTTZbdelF0WAgxkpgsjwDLFovF2tfXdyxPnJvU19d3TIdeFkKMxMcTY5VRgNbWVkdnZ6eVPOvKlSuW1tZWh345apxLVjs8B5yQZTnidrsH8lXNam5u/qy/v7/NZDKZgUkhxP34XEZFT5fL9WhxcXFPQ97KysrC8fHxrIueAPeAldLS0pLx8fEzLperOMV9OZfL5So2QK/oLJuUClwG7qDDDw0Nte+Fz3d2dlqHhobaDNB3EmvjcW3V'+
			'SjGjtVK+VBQlNjAwELhw4cJetFJ+B+6la6Vsq3l1+/btwNWrV1dyAX3r1q1daV4ZVQc0kdt2YbV+IsIutQuNStugffr06Ru/3/92cXHxA0BlZWWR0+ncd/LkyQP5atD+p/9rSzxRyT5CMPPxRwgRcvwRwr89/urbqQxV5AAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="fullscreen gallery off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 3px;';
		hs+='cursor : pointer;';
		hs+='height : 46px;';
		hs+='position : absolute;';
		hs+='right : 3px;';
		hs+='visibility : hidden;';
		hs+='width : 46px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_gallery_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_gallery_off.onclick=function (e) {
			player.setVariableValue('gallery_full', Number("0"));
			me._fullscreen_gallery_off.style[domTransition]='none';
			me._fullscreen_gallery_off.style.visibility='hidden';
			me._fullscreen_gallery_off.ggVisible=false;
			me._fullscreen_gallery_on.style[domTransition]='none';
			me._fullscreen_gallery_on.style.visibility=(Number(me._fullscreen_gallery_on.style.opacity)>0||!me._fullscreen_gallery_on.style.opacity)?'inherit':'hidden';
			me._fullscreen_gallery_on.ggVisible=true;
			player.setVariableValue('gallery_border', Number("0"));
		}
		me._fullscreen_gallery_off.ggUpdatePosition=function (useTransition) {
		}
		me._popup_frame.appendChild(me._fullscreen_gallery_off);
		el=me._fullscreen_gallery_on=document.createElement('div');
		els=me._fullscreen_gallery_on__img=document.createElement('img');
		els.className='ggskin ggskin_fullscreen_gallery_on';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAFlUlEQVRogdWa3U9TZxzHP8/hZS62ph00aCIoA5QSkkqoTSDRDQmUK+sSvdHMm12LqbcsMUaum/gP7ELCjZLoLkyGgAQ3IcHiqGEob0NhGyOlKbGnmS/0nF2c0+VY2tJCoe6bcHGe5zy/8+mTH+f5vRyhqio7VCFQARwByoASwAQU6/PvARkIAavAa2AJ2NjJQ8V2wIUQqKrqAOqA49t89gwwLYQIZLtQVdVtgZ9Cgz0MoCiKEgwG1+bm5lZfvHix7vf7IxMTE/+8evVqA+Do0aOFjY2NnzudTrPdbrfU1NSU2Wy2UkmSJN3eH8CMEOLn3QK3A81AOUA4HA4/fvx47ubNm8sTExPvMzUC0NDQUHz9+vXy06dP11itVqs+vAyMCSGmcwnuARoA1tfXwz'+
			'09Pc+9Xu9fsVgsG95NKigowOfzHbp8+bLDYrHEf8CvQogfdwpuAr4BqhRFiQ0ODgbOnz8/G4lEdvwfbZTZbBZ379491tbW5pAkqQBYAO4LISKpwKVkE7oswEWgSpbliNfrHXC73TO5hgaIRCJqR0fHjNfrHZBlOQJUARdVVbWkWpNqx03AJeBQKBQKnT17dmR0dPRdroGTyeVyFT948ODr0tLSEmAF6BVCyMZ70rnKt0DV2tpaqKmp6dH8/PyO3rnZqrq6unBsbOyMDr8ghOgxzqdyFQ+6e3g8npG9hgaYn5/f8Hg8I3G3UVXVk3hPIrgdaFAUJdbV1fVkr9wjmUZHR991dXU9URQlBjSoqmo3zie6yndA+cOHD5+53e6ZvQRNpf7+/tr29vYGYEkI8QNs9vFTQOv6+nq4oqKifzfeHtuR2WwWS0tLHRaLxQIMCiF+'+
			'SfTx4wA9PT3PPxVo0F6Vvb298XimNj4e3/ETwLlwOBy22Ww/pTsRVVV9mWw8Go1OmEymS+kgZFnu3b9/f2OyOSFEbbJx0E7YYDDYoYcH94HJ+I7XAQwPD8/u4BgX2124lWKxGMPDw7P6ZR1oO14IfK8oSszhcNybmpr6kM5IfMfT7VA2ytRefX19USAQ+EYPCboltCSAYDAY2go6n5qamvoQDAZD+mWFhJa5MDc3t5o/rMxkYDwioaVbTE9Pr2eyOBqNTkSj0We5gsnGnoGxTELLEfH7/W8yWWwymS6ZTKaL28PcmT0DY4mEFgkSCATe5gpmt2RgNEno2fjCwsKeB1PZysBYnC6R+KQlodU9qKqqKswzy5YyML6X0Io1OByOfflDykwGRllCqzDhdDoPZLJYluVeWZZ7cwWTjT0DY6gQrSxWW1dXZ0ErzqRVqiBpu8'+
			'rGns4IsCqh1fKoqakpyyXQbsjA+FpCK0Bis9lK6uvri/KHlV52u73IZrOV6JdLElrVdFaSpIIbN26UZ2pIVdWXxr9M/FSW5d7EdZk+r7u7u1yPDOeAjfh7fBqgpaWlJlNDSbRr8Th8xPYbaLVtgEnAabVaD/t8voPXrl37OyXdDuLwrTKkVPL5fAetVusXwJ9CiMnEZPkroOUTTZbdelF0WAgxkpgsjwDLFovF2tfXdyxPnJvU19d3TIdeFkKMxMcTY5VRgNbWVkdnZ6eVPOvKlSuW1tZWh345apxLVjs8B5yQZTnidrsH8lXNam5u/qy/v7/NZDKZgUkhxP34XEZFT5fL9WhxcXFPQ97KysrC8fHxrIueAPeAldLS0pLx8fEzLperOMV9OZfL5So2QK/oLJuUClwG7qDDDw0Nte+Fz3d2dlqHhobaDNB3EmvjcW3V'+
			'SjGjtVK+VBQlNjAwELhw4cJetFJ+B+6la6Vsq3l1+/btwNWrV1dyAX3r1q1daV4ZVQc0kdt2YbV+IsIutQuNStugffr06Ru/3/92cXHxA0BlZWWR0+ncd/LkyQP5atD+p/9rSzxRyT5CMPPxRwgRcvwRwr89/urbqQxV5AAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="fullscreen gallery on";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='bottom : 3px;';
		hs+='cursor : pointer;';
		hs+='height : 46px;';
		hs+='position : absolute;';
		hs+='right : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 46px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_gallery_on.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_gallery_on.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._fullscreen_gallery_on.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._fullscreen_gallery_on.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._fullscreen_gallery_on.style[domTransition]='';
				if (me._fullscreen_gallery_on.ggCurrentLogicStateVisible == 0) {
					me._fullscreen_gallery_on.style.visibility="hidden";
					me._fullscreen_gallery_on.ggVisible=false;
				}
				else {
					me._fullscreen_gallery_on.style.visibility=(Number(me._fullscreen_gallery_on.style.opacity)>0||!me._fullscreen_gallery_on.style.opacity)?'inherit':'hidden';
					me._fullscreen_gallery_on.ggVisible=true;
				}
			}
		}
		me._fullscreen_gallery_on.onclick=function (e) {
			player.setVariableValue('gallery_full', Number("1"));
			me._fullscreen_gallery_on.style[domTransition]='none';
			me._fullscreen_gallery_on.style.visibility='hidden';
			me._fullscreen_gallery_on.ggVisible=false;
			me._fullscreen_gallery_off.style[domTransition]='none';
			me._fullscreen_gallery_off.style.visibility=(Number(me._fullscreen_gallery_off.style.opacity)>0||!me._fullscreen_gallery_off.style.opacity)?'inherit':'hidden';
			me._fullscreen_gallery_off.ggVisible=true;
			player.setVariableValue('gallery_border', Number("1"));
		}
		me._fullscreen_gallery_on.ggUpdatePosition=function (useTransition) {
		}
		me._popup_frame.appendChild(me._fullscreen_gallery_on);
		me._popup.appendChild(me._popup_frame);
		el=me._close_gallery=document.createElement('div');
		els=me._close_gallery__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_gallery__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close gallery";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0%;';
		hs+='top : 0%;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_gallery.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_gallery.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('gallery_full') == 1)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._close_gallery.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._close_gallery.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._close_gallery.style[domTransition]='right 500ms ease 0ms, top 500ms ease 0ms, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_gallery.ggCurrentLogicStatePosition == 0) {
					me._close_gallery.style.right='0%';
					me._close_gallery.style.top='0%';
				}
				else {
					me._close_gallery.style.right='0%';
					me._close_gallery.style.top='0%';
				}
			}
		}
		me._close_gallery.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['close_gallery'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._close_gallery.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._close_gallery.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._close_gallery.style[domTransition]='right 500ms ease 0ms, top 500ms ease 0ms, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_gallery.ggCurrentLogicStateAngle == 0) {
					me._close_gallery.ggParameter.a = 90;
					me._close_gallery.style[domTransform]=parameterToTransform(me._close_gallery.ggParameter);
				}
				else {
					me._close_gallery.ggParameter.a = 0;
					me._close_gallery.style[domTransform]=parameterToTransform(me._close_gallery.ggParameter);
				}
			}
		}
		me._close_gallery.onclick=function (e) {
			player.setVariableValue('open_popup', false);
			if (player.transitionsDisabled) {
				me._popup.style[domTransition]='none';
			} else {
				me._popup.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup.ggParameter.sx=0.1;me._popup.ggParameter.sy=0.1;
			me._popup.style[domTransform]=parameterToTransform(me._popup.ggParameter);
			me._popup_frame.ggText="";
			me._popup_frame.ggTextDiv.innerHTML=me._popup_frame.ggText;
			if (me._popup_frame.ggUpdateText) {
				me._popup_frame.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._popup_frame.ggUpdatePosition) {
				me._popup_frame.ggUpdatePosition();
			}
			me._popup_frame.ggTextDiv.scrollTop = 0;
		}
		me._close_gallery.onmouseover=function (e) {
			me.elementMouseOver['close_gallery']=true;
			me._close_gallery.logicBlock_angle();
		}
		me._close_gallery.onmouseout=function (e) {
			me.elementMouseOver['close_gallery']=false;
			me._close_gallery.logicBlock_angle();
		}
		me._close_gallery.ontouchend=function (e) {
			me.elementMouseOver['close_gallery']=false;
			me._close_gallery.logicBlock_angle();
		}
		me._close_gallery.ggUpdatePosition=function (useTransition) {
		}
		me._popup.appendChild(me._close_gallery);
		me.divSkin.appendChild(me._popup);
		el=me._popup_video=document.createElement('div');
		el.ggId="popup_video";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+='background : #3b3b3b;';
		hs+='border : 0px solid rgba(0,0,0,0.705882);';
		hs+='cursor : default;';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._popup_video.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._popup_video.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._popup_video.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._popup_video.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._popup_video.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup_video.ggCurrentLogicStatePosition == 0) {
					me._popup_video.style.left='0%';
					me._popup_video.style.top='0%';
				}
				else {
					me._popup_video.style.left='10%';
					me._popup_video.style.top='10%';
				}
			}
		}
		me._popup_video.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._popup_video.ggCurrentLogicStateSize != newLogicStateSize) {
				me._popup_video.ggCurrentLogicStateSize = newLogicStateSize;
				me._popup_video.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup_video.ggCurrentLogicStateSize == 0) {
					me._popup_video.style.width='100%';
					me._popup_video.style.height='100%';
					setTimeout(function() {skin.updateSize(me._popup_video);}, 500);
				}
				else {
					me._popup_video.style.width='80%';
					me._popup_video.style.height='80%';
					setTimeout(function() {skin.updateSize(me._popup_video);}, 500);
				}
			}
		}
		me._popup_video.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('open_video') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_video.style[domTransition]='left 500ms ease 0ms, top 500ms ease 0ms, width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._popup_video.ggCurrentLogicStateVisible == 0) {
					me._popup_video.style.visibility=(Number(me._popup_video.style.opacity)>0||!me._popup_video.style.opacity)?'inherit':'hidden';
					me._popup_video.ggVisible=true;
				}
				else {
					me._popup_video.style.visibility="hidden";
					me._popup_video.ggVisible=false;
				}
			}
		}
		me._popup_video.ggUpdatePosition=function (useTransition) {
		}
		el=me._video_ytb=document.createElement('div');
		me._video_ytb.seekbars = [];
			me._video_ytb.ggYoutubeApiReady = function() { skin.ggYoutubeApiLoaded = true;}
		me._video_ytb.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._video_ytb.seekbars.length; i++) {
					var seekbar = me.findElements(me._video_ytb.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._video_ytb.hasChildNodes()) {
				me._video_ytb.removeChild(me._video_ytb.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._video_ytb.ggVideoNotLoaded ==false && me._video_ytb.ggDeactivate) { me._video_ytb.ggDeactivate(); }
				me._video_ytb.ggVideoNotLoaded = true;
				return;
			}
			me._video_ytb.ggVideoNotLoaded = false;
			me._video_ytb__vid=document.createElement('iframe');
			me._video_ytb__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;controls=0&amp;loop=0&amp;enablejsapi=0&amp;rel=0';
			var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
			me._video_ytb__vid.setAttribute('src', ggVideoUrl);
			me._video_ytb__vid.setAttribute('width', '100%');
			me._video_ytb__vid.setAttribute('height', '100%');
			me._video_ytb__vid.setAttribute('allow', 'autoplay');
			me._video_ytb__vid.setAttribute('allowfullscreen', 'true');
			me._video_ytb__vid.setAttribute('style', 'border:none; ; ;');
			me._video_ytb.appendChild(me._video_ytb__vid);
			me._video_ytb.ggVideoSource = media;
			if (skin.ggYoutubeApiLoaded && skin.ggYoutubeApiLoaded == true) {me._video_ytb.ggYoutubeApiReady();}
		}
		el.ggId="Video_ytb";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 80%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_ytb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._video_ytb.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._popup_video.appendChild(me._video_ytb);
		el=me._close_video_ytb=document.createElement('div');
		els=me._close_video_ytb__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_video_ytb__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_video_ytb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0%;';
		hs+='top : 0%;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_video_ytb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_video_ytb.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('gallery_full') == 1)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._close_video_ytb.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._close_video_ytb.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._close_video_ytb.style[domTransition]='right 500ms ease 0ms, top 500ms ease 0ms, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_video_ytb.ggCurrentLogicStatePosition == 0) {
					me._close_video_ytb.style.right='0%';
					me._close_video_ytb.style.top='0%';
				}
				else {
					me._close_video_ytb.style.right='0%';
					me._close_video_ytb.style.top='0%';
				}
			}
		}
		me._close_video_ytb.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['close_video_ytb'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._close_video_ytb.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._close_video_ytb.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._close_video_ytb.style[domTransition]='right 500ms ease 0ms, top 500ms ease 0ms, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_video_ytb.ggCurrentLogicStateAngle == 0) {
					me._close_video_ytb.ggParameter.a = 90;
					me._close_video_ytb.style[domTransform]=parameterToTransform(me._close_video_ytb.ggParameter);
				}
				else {
					me._close_video_ytb.ggParameter.a = 0;
					me._close_video_ytb.style[domTransform]=parameterToTransform(me._close_video_ytb.ggParameter);
				}
			}
		}
		me._close_video_ytb.onclick=function (e) {
			player.setVariableValue('open_video', false);
			if (player.transitionsDisabled) {
				me._popup_video.style[domTransition]='none';
			} else {
				me._popup_video.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._popup_video.ggParameter.sx=0.1;me._popup_video.ggParameter.sy=0.1;
			me._popup_video.style[domTransform]=parameterToTransform(me._popup_video.ggParameter);
			me._video_ytb.ggInitMedia("");
			player.changeVolume("_main",1);
				player.playSound("_background","0");
				player.playSound("Element01","1");
		}
		me._close_video_ytb.onmouseover=function (e) {
			me.elementMouseOver['close_video_ytb']=true;
			me._close_video_ytb.logicBlock_angle();
		}
		me._close_video_ytb.onmouseout=function (e) {
			me.elementMouseOver['close_video_ytb']=false;
			me._close_video_ytb.logicBlock_angle();
		}
		me._close_video_ytb.ontouchend=function (e) {
			me.elementMouseOver['close_video_ytb']=false;
			me._close_video_ytb.logicBlock_angle();
		}
		me._close_video_ytb.ggUpdatePosition=function (useTransition) {
		}
		me._popup_video.appendChild(me._close_video_ytb);
		me.divSkin.appendChild(me._popup_video);
		el=me._container_tooltip=document.createElement('div');
		el.ggId="Container_tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='z-index: 1999;';
		hs+='height : 25px;';
		hs+='left : -60px;';
		hs+='position : absolute;';
		hs+='top : -27px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_tooltip.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('tooltip_hover') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_tooltip.style[domTransition]='';
				if (me._container_tooltip.ggCurrentLogicStateVisible == 0) {
					me._container_tooltip.style.visibility=(Number(me._container_tooltip.style.opacity)>0||!me._container_tooltip.style.opacity)?'inherit':'hidden';
					me._container_tooltip.ggVisible=true;
				}
				else {
					me._container_tooltip.style.visibility="hidden";
					me._container_tooltip.ggVisible=false;
				}
			}
		}
		me._container_tooltip.ggUpdatePosition=function (useTransition) {
		}
		el=me._tooltip=document.createElement('div');
		els=me._tooltip__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 2px 2px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 120px;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tooltip.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tooltip.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_tooltip.appendChild(me._tooltip);
		me.divSkin.appendChild(me._container_tooltip);
		el=me._tooltip_hs_con=document.createElement('div');
		el.ggId="tooltip_hs_con";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -60px;';
		hs+='position : absolute;';
		hs+='top : -23px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._tooltip_hs_con.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._tooltip_hs_con.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tooltip_hs_con.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tooltip_hs_con.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tooltip_hs_con.style[domTransition]='';
				if (me._tooltip_hs_con.ggCurrentLogicStateVisible == 0) {
					me._tooltip_hs_con.style.visibility="hidden";
					me._tooltip_hs_con.ggVisible=false;
				}
				else {
					me._tooltip_hs_con.style.visibility=(Number(me._tooltip_hs_con.style.opacity)>0||!me._tooltip_hs_con.style.opacity)?'inherit':'hidden';
					me._tooltip_hs_con.ggVisible=true;
				}
			}
		}
		me._tooltip_hs_con.onmouseover=function (e) {
			me.elementMouseOver['tooltip_hs_con']=true;
			me._tooltip_hs.logicBlock_visible();
		}
		me._tooltip_hs_con.onmouseout=function (e) {
			me.elementMouseOver['tooltip_hs_con']=false;
			me._tooltip_hs.logicBlock_visible();
		}
		me._tooltip_hs_con.ontouchend=function (e) {
			me.elementMouseOver['tooltip_hs_con']=false;
			me._tooltip_hs.logicBlock_visible();
		}
		me._tooltip_hs_con.ggUpdatePosition=function (useTransition) {
		}
		el=me._tooltip_hs=document.createElement('div');
		els=me._tooltip_hs__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip_hs";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tooltip_hs.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tooltip_hs.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['tooltip_hs_con'] == true)) && 
				((me.ggUserdata.tags.indexOf("fly") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tooltip_hs.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tooltip_hs.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tooltip_hs.style[domTransition]='';
				if (me._tooltip_hs.ggCurrentLogicStateVisible == 0) {
					me._tooltip_hs.style.visibility=(Number(me._tooltip_hs.style.opacity)>0||!me._tooltip_hs.style.opacity)?'inherit':'hidden';
					me._tooltip_hs.ggVisible=true;
				}
				else {
					me._tooltip_hs.style.visibility="hidden";
					me._tooltip_hs.ggVisible=false;
				}
			}
		}
		me._tooltip_hs.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._tooltip_hs_con.appendChild(me._tooltip_hs);
		el=me._thumb_ex=document.createElement('div');
		els=me._thumb_ex__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._thumb_ex.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumb_ex";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 25px;';
		hs+='cursor : default;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumb_ex.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumb_ex.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			var parentWidth = me._thumb_ex.clientWidth;
			var parentHeight = me._thumb_ex.clientHeight;
			var img = me._thumb_ex__img;
			var aspectRatioDiv = me._thumb_ex.clientWidth / me._thumb_ex.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._tooltip_hs_con.appendChild(me._thumb_ex);
		me.divSkin.appendChild(me._tooltip_hs_con);
		el=me._info_con=document.createElement('div');
		el.ggId="info_con";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 70px;';
		hs+='height : 216px;';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 260px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_con.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._info_con.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height > 1))
			)
			{
				newLogicStatePosition = 1;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info_con.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info_con.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info_con.style[domTransition]='right 200ms ease 0ms, bottom 200ms ease 0ms, width 200ms ease 0ms, height 200ms ease 0ms, opacity 700ms ease 0ms';
				if (me._info_con.ggCurrentLogicStatePosition == 0) {
					me._info_con.style.right='0px';
					me._info_con.style.bottom='0px';
				}
				else if (me._info_con.ggCurrentLogicStatePosition == 1) {
					me._info_con.style.right='50%';
					me._info_con.style.bottom='0px';
				}
				else {
					me._info_con.style.right='5px';
					me._info_con.style.bottom='70px';
				}
			}
		}
		me._info_con.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height > 1))
			)
			{
				newLogicStateSize = 1;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._info_con.ggCurrentLogicStateSize != newLogicStateSize) {
				me._info_con.ggCurrentLogicStateSize = newLogicStateSize;
				me._info_con.style[domTransition]='right 200ms ease 0ms, bottom 200ms ease 0ms, width 200ms ease 0ms, height 200ms ease 0ms, opacity 700ms ease 0ms';
				if (me._info_con.ggCurrentLogicStateSize == 0) {
					me._info_con.style.width='100%';
					me._info_con.style.height='50%';
					setTimeout(function() {skin.updateSize(me._info_con);}, 200);
				}
				else if (me._info_con.ggCurrentLogicStateSize == 1) {
					me._info_con.style.width='50%';
					me._info_con.style.height='100%';
					setTimeout(function() {skin.updateSize(me._info_con);}, 200);
				}
				else {
					me._info_con.style.width='260px';
					me._info_con.style.height='216px';
					me._info_con.style.height='216px';
					setTimeout(function() {skin.updateSize(me._info_con);}, 200);
				}
			}
		}
		me._info_con.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('information') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._info_con.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._info_con.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._info_con.style[domTransition]='right 200ms ease 0ms, bottom 200ms ease 0ms, width 200ms ease 0ms, height 200ms ease 0ms, opacity 700ms ease 0ms';
				if (me._info_con.ggCurrentLogicStateAlpha == 0) {
					me._info_con.style.visibility=me._info_con.ggVisible?'inherit':'hidden';
					me._info_con.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._info_con.style.opacity == 0.0) { me._info_con.style.visibility="hidden"; } }, 705);
					me._info_con.style.opacity=0;
				}
			}
		}
		me._info_con.ggUpdatePosition=function (useTransition) {
		}
		el=me._info_rec=document.createElement('div');
		el.ggId="info_rec";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #3e3e3e;';
		hs+='border : 1px solid #4f4f4f;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 100%;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_rec.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_rec.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('information') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info_rec.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info_rec.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info_rec.style[domTransition]='left 700ms ease 0ms, top 700ms ease 0ms';
				if (me._info_rec.ggCurrentLogicStatePosition == 0) {
					me._info_rec.style.left='0%';
					me._info_rec.style.top='0%';
				}
				else {
					me._info_rec.style.left='0%';
					me._info_rec.style.top='100%';
				}
			}
		}
		me._info_rec.ggUpdatePosition=function (useTransition) {
		}
		el=me._info_tt=document.createElement('div');
		els=me._info_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_tt";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text info-tt";
		el.ggType='text';
		hs ='';
		hs+='height : calc(100%  -  20px);';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : calc(100%  -  20px);';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #4f4f4f;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 5px 6px 5px 6px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._info_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_tt.ggUpdatePosition=function (useTransition) {
		}
		me._info_rec.appendChild(me._info_tt);
		me._info_con.appendChild(me._info_rec);
		me.divSkin.appendChild(me._info_con);
		el=me.__3d_space_con=document.createElement('div');
		el.ggId="3D_space_con";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me.__3d_space_con.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me.__3d_space_con.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('3D_space_open') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me.__3d_space_con.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me.__3d_space_con.ggCurrentLogicStateScaling = newLogicStateScaling;
				me.__3d_space_con.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms';
				if (me.__3d_space_con.ggCurrentLogicStateScaling == 0) {
					me.__3d_space_con.ggParameter.sx = 1;
					me.__3d_space_con.ggParameter.sy = 1;
					me.__3d_space_con.style[domTransform]=parameterToTransform(me.__3d_space_con.ggParameter);
				}
				else {
					me.__3d_space_con.ggParameter.sx = 0.1;
					me.__3d_space_con.ggParameter.sy = 0.1;
					me.__3d_space_con.style[domTransform]=parameterToTransform(me.__3d_space_con.ggParameter);
				}
			}
		}
		me.__3d_space_con.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('3D_space_open') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me.__3d_space_con.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me.__3d_space_con.ggCurrentLogicStateVisible = newLogicStateVisible;
				me.__3d_space_con.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms';
				if (me.__3d_space_con.ggCurrentLogicStateVisible == 0) {
					me.__3d_space_con.style.visibility=(Number(me.__3d_space_con.style.opacity)>0||!me.__3d_space_con.style.opacity)?'inherit':'hidden';
					me.__3d_space_con.ggVisible=true;
				}
				else {
					me.__3d_space_con.style.visibility="hidden";
					me.__3d_space_con.ggVisible=false;
				}
			}
		}
		me.__3d_space_con.ggUpdatePosition=function (useTransition) {
		}
		el=me.__3d_space_popup=document.createElement('div');
		els=me.__3d_space_popup__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="3D_space_popup";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : calc(100%  -  40px);';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 40px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='background: #1d1d1d;';
		hs+='background: rgba(29,29,29,0.705882);';
		hs+='border: 0px solid #ffffff;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me.__3d_space_popup.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__3d_space_popup.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('3D_space_open') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__3d_space_popup.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__3d_space_popup.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__3d_space_popup.style[domTransition]='opacity 700ms ease 0ms, border-color 0s';
				if (me.__3d_space_popup.ggCurrentLogicStateAlpha == 0) {
					me.__3d_space_popup.style.visibility=me.__3d_space_popup.ggVisible?'inherit':'hidden';
					me.__3d_space_popup.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me.__3d_space_popup.style.opacity == 0.0) { me.__3d_space_popup.style.visibility="hidden"; } }, 705);
					me.__3d_space_popup.style.opacity=0;
				}
			}
		}
		me.__3d_space_popup.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('gallery_border') == 1))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((player.getVariableValue('gallery_border') == 0))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me.__3d_space_popup.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me.__3d_space_popup.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me.__3d_space_popup__text.style[domTransition]='opacity 700ms ease 0ms, border-color 0s';
				if (me.__3d_space_popup.ggCurrentLogicStateBorderColor == 0) {
					me.__3d_space_popup__text.style.borderColor="rgba(0,0,0,1)";
				}
				else if (me.__3d_space_popup.ggCurrentLogicStateBorderColor == 1) {
					me.__3d_space_popup__text.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me.__3d_space_popup__text.style.borderColor="rgba(255,255,255,1)";
				}
			}
		}
		me.__3d_space_popup.ggUpdatePosition=function (useTransition) {
		}
		me.__3d_space_con.appendChild(me.__3d_space_popup);
		el=me.__3d_space_rec=document.createElement('div');
		el.ggId="3D_space_rec";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #282828;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 40px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__3d_space_rec.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__3d_space_rec.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('3D_space_open') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me.__3d_space_rec.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me.__3d_space_rec.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me.__3d_space_rec.style[domTransition]='opacity 700ms ease 0ms';
				if (me.__3d_space_rec.ggCurrentLogicStateAlpha == 0) {
					me.__3d_space_rec.style.visibility=me.__3d_space_rec.ggVisible?'inherit':'hidden';
					me.__3d_space_rec.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me.__3d_space_rec.style.opacity == 0.0) { me.__3d_space_rec.style.visibility="hidden"; } }, 705);
					me.__3d_space_rec.style.opacity=0;
				}
			}
		}
		me.__3d_space_rec.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_3d_space=document.createElement('div');
		els=me._tt_3d_space__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_3D_space";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text test_tt";
		el.ggType='text';
		hs ='';
		hs+='height : 40px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 160px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: 500;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+="padding: 5px 10px; margin: 5px 10px;";
		els.setAttribute('style',hs);
		els.innerHTML="3D Space";
		el.appendChild(els);
		me._tt_3d_space.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_3d_space.ggUpdatePosition=function (useTransition) {
		}
		me.__3d_space_rec.appendChild(me._tt_3d_space);
		el=me.__3d_space_cross=document.createElement('div');
		els=me.__3d_space_cross__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik0xMC40LDIuOUE0MC41LDQwLjUsMCwwLDAsNi41LDYuNmMtMy4zLDMuMi0zLjYsMy41LTMuNyw0LjFhMi44LDIuOCwwLDAsMC0uMS44LDQuMyw0LjMsMCwwLDEsLjEuNWMuMS4zLDIuNCwyLjcsOS4zLDkuNiw1LDUuMSw5LjIsOS4zLDkuMiw5LjVhMi4xLDIuMSwwLDAsMS0uMSwxLjljLS4xLjMtNC4zLDQuNS05LjIsOS41QzIsNTIuNCwyLjQsNTEuOSwyLj'+
			'gsNTMuMnMuNSwxLDMuNyw0LjIsNC4xLDQuMSw1LjQsMy44LDEuMS0uNiw5LjgtOS4zYzUtNS4xLDkuMy05LjIsOS41LTkuM2EyLjIsMi4yLDAsMCwxLDEuNiwwYy4yLjEsNC41LDQuMiw5LjYsOS4zLDEwLjEsMTAuMSw5LjUsOS42LDEwLjksOS4zczEuMi0uOCw0LjEtMy43bDMuNy0zLjhhMy40LDMuNCwwLDAsMCwwLTJjLS4xLS4xLTQuMi00LjQtOS4yLTkuNHMtOS4xLTkuMi05LjItOS40YTIuOCwyLjgsMCwwLDEsMC0xLjhjLjEtLjIsNC4yLTQuNCw5LjMtOS41LDYuOS02LjksOS4xLTkuMyw5LjItOS42YTEuMSwxLjEsMCwwLDAsLjEtLjVjLjEtLjEsMC0uNSwwLS44cy0uNy0xLTMuNy00LjFs'+
			'LTQtMy43YTEuOSwxLjksMCwwLDAtMS44LDBjLS4yLjEtNC41LDQuMy05LjUsOS4zLTEwLjEsMTAtOS41LDkuNi0xMC45LDkuMnMtMS45LTEuNC05LjctOS4zTDEyLjIsMi44QTIuOCwyLjgsMCwwLDAsMTAuNCwyLjlaIi8+Cjwvc3ZnPgo=';
		me.__3d_space_cross__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="3D_space_cross";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me.__3d_space_cross.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me.__3d_space_cross.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['_3d_space_cross'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me.__3d_space_cross.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me.__3d_space_cross.ggCurrentLogicStateScaling = newLogicStateScaling;
				me.__3d_space_cross.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me.__3d_space_cross.ggCurrentLogicStateScaling == 0) {
					me.__3d_space_cross.ggParameter.sx = 1.1;
					me.__3d_space_cross.ggParameter.sy = 1.1;
					me.__3d_space_cross.style[domTransform]=parameterToTransform(me.__3d_space_cross.ggParameter);
				}
				else {
					me.__3d_space_cross.ggParameter.sx = 1;
					me.__3d_space_cross.ggParameter.sy = 1;
					me.__3d_space_cross.style[domTransform]=parameterToTransform(me.__3d_space_cross.ggParameter);
				}
			}
		}
		me.__3d_space_cross.onclick=function (e) {
			me._popup_frame.ggText="";
			me._popup_frame.ggTextDiv.innerHTML=me._popup_frame.ggText;
			if (me._popup_frame.ggUpdateText) {
				me._popup_frame.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._popup_frame.ggUpdatePosition) {
				me._popup_frame.ggUpdatePosition();
			}
			me._popup_frame.ggTextDiv.scrollTop = 0;
			player.setVariableValue('3D_space_open', false);
		}
		me.__3d_space_cross.onmouseover=function (e) {
			me.elementMouseOver['_3d_space_cross']=true;
			me.__3d_space_cross.logicBlock_scaling();
		}
		me.__3d_space_cross.onmouseout=function (e) {
			me.elementMouseOver['_3d_space_cross']=false;
			me.__3d_space_cross.logicBlock_scaling();
		}
		me.__3d_space_cross.ontouchend=function (e) {
			me.elementMouseOver['_3d_space_cross']=false;
			me.__3d_space_cross.logicBlock_scaling();
		}
		me.__3d_space_cross.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__3d_space_rec.appendChild(me.__3d_space_cross);
		me.__3d_space_con.appendChild(me.__3d_space_rec);
		me.divSkin.appendChild(me.__3d_space_con);
		el=me._container_info=document.createElement('div');
		el.ggId="Container_info";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 40%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 60%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._container_info.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_info.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._container_info.ggCurrentLogicStateSize != newLogicStateSize) {
				me._container_info.ggCurrentLogicStateSize = newLogicStateSize;
				me._container_info.style[domTransition]='width 0s, height 0s, opacity 0s';
				if (me._container_info.ggCurrentLogicStateSize == 0) {
					me._container_info.style.width='98%';
					me._container_info.style.height='99%';
					skin.updateSize(me._container_info);
				}
				else {
					me._container_info.style.width='60%';
					me._container_info.style.height='40%';
					skin.updateSize(me._container_info);
				}
			}
		}
		me._container_info.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('hs_info') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._container_info.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._container_info.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._container_info.style[domTransition]='width 0s, height 0s, opacity 0s';
				if (me._container_info.ggCurrentLogicStateAlpha == 0) {
					me._container_info.style.visibility=me._container_info.ggVisible?'inherit':'hidden';
					me._container_info.style.opacity=1;
				}
				else {
					me._container_info.style.visibility="hidden";
					me._container_info.style.opacity=0;
				}
			}
		}
		me._container_info.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._video_1=document.createElement('div');
		me._video_1.seekbars = [];
		me._video_1.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._video_1.seekbars.length; i++) {
					var seekbar = me.findElements(me._video_1.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._video_1.hasChildNodes()) {
				me._video_1.removeChild(me._video_1.lastChild);
			}
			if (me._video_1__vid) {
				me._video_1__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._video_1.ggVideoNotLoaded ==false && me._video_1.ggDeactivate) { me._video_1.ggDeactivate(); }
				me._video_1.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('video_1');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._video_1.ggVideoNotLoaded = false;
			me._video_1__vid=document.createElement('video');
			me._video_1__vid.className='ggskin ggskin_video';
			me._video_1__vid.setAttribute('width', '100%');
			me._video_1__vid.setAttribute('height', '100%');
			me._video_1__vid.setAttribute('controlsList', 'nodownload');
			me._video_1__vid.setAttribute('oncontextmenu', 'return false;');
			me._video_1__vid.setAttribute('autoplay', '');
			me._video_1__source=document.createElement('source');
			me._video_1__source.setAttribute('src', media);
			me._video_1__vid.setAttribute('playsinline', 'playsinline');
			me._video_1__vid.setAttribute('style', ';');
			me._video_1__vid.style.outline = 'none';
			me._video_1__vid.appendChild(me._video_1__source);
			me._video_1.appendChild(me._video_1__vid);
			var videoEl = player.registerVideoElement('Video_1', me._video_1__vid);
			videoEl.autoplay = true;
			notifySeekbars();
			me._video_1.ggVideoSource = media;
		}
		el.ggId="Video_1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_1.ggIsActive=function() {
			if (me._video_1__vid != null) {
				return (me._video_1__vid.paused == false && me._video_1__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._video_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_info.appendChild(me._video_1);
		el=me._box_info=document.createElement('div');
		el.ggId="Box_info";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 4px solid #253d8f;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._box_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._box_info.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._info_image=document.createElement('div');
		els=me._info_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._info_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="info_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : calc(100% - 40px);';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : inherit;';
		hs+='width : 45%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_image.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info_image.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info_image.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info_image.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._info_image.ggCurrentLogicStatePosition == 0) {
					me._info_image.style.left='10px';
					me._info_image.style.top='45px';
				}
				else {
					me._info_image.style.left='5px';
					me._info_image.style.top='35px';
				}
			}
		}
		me._info_image.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._info_image.ggCurrentLogicStateSize != newLogicStateSize) {
				me._info_image.ggCurrentLogicStateSize = newLogicStateSize;
				me._info_image.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._info_image.ggCurrentLogicStateSize == 0) {
					me._info_image.style.width='calc(100% - 20px)';
					me._info_image.style.height='34%';
					skin.updateSize(me._info_image);
				}
				else {
					me._info_image.style.width='45%';
					me._info_image.style.height='calc(100% - 40px)';
					me._info_image.style.height='calc(100% - 40px)';
					skin.updateSize(me._info_image);
				}
			}
		}
		me._info_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._info_image.clientWidth;
			var parentHeight = me._info_image.clientHeight;
			var img = me._info_image__img;
			var aspectRatioDiv = me._info_image.clientWidth / me._info_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = parentWidth;
			currentHeight = parentHeight;
			img.style.width=parentWidth + 'px';
			img.style.height=parentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._box_info.appendChild(me._info_image);
		el=me._text_info=document.createElement('div');
		els=me._text_info__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : calc(100% - 50px);';
		hs+='position : absolute;';
		hs+='right : 25px;';
		hs+='top : 30px;';
		hs+='visibility : inherit;';
		hs+='width : calc(50% - 50px);';
		hs+='pointer-events:auto;';
		hs+='overflow: auto; text-shadow: 1px 1px 2px #adadad;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 5px 6px 5px 6px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._text_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_info.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._text_info.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._text_info.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._text_info.style[domTransition]='right 0s, top 0s, width 0s, height 0s';
				if (me._text_info.ggCurrentLogicStatePosition == 0) {
					me._text_info.style.right='20px';
					me._text_info.style.top='Calc(45% - 35px)';
				}
				else {
					me._text_info.style.right='25px';
					me._text_info.style.top='30px';
				}
			}
		}
		me._text_info.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._text_info.ggCurrentLogicStateSize != newLogicStateSize) {
				me._text_info.ggCurrentLogicStateSize = newLogicStateSize;
				me._text_info.style[domTransition]='right 0s, top 0s, width 0s, height 0s';
				if (me._text_info.ggCurrentLogicStateSize == 0) {
					me._text_info.style.width='calc(100% - 40px)';
					me._text_info__text.style.width='100%';
					me._text_info.style.height='56%';
					me._text_info__text.style.height='100%';
					skin.updateSize(me._text_info);
				}
				else {
					me._text_info.style.width='calc(50% - 50px)';
					me._text_info__text.style.width='100%';
					me._text_info.style.height='calc(100% - 50px)';
					me._text_info__text.style.width='100%';
					me._text_info.style.height='calc(100% - 50px)';
					skin.updateSize(me._text_info);
				}
			}
		}
		me._text_info.ggUpdatePosition=function (useTransition) {
		}
		me._box_info.appendChild(me._text_info);
		el=me._text_title=document.createElement('div');
		els=me._text_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 30px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 45%;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #adadad;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 30px;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._text_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_title.ggUpdatePosition=function (useTransition) {
		}
		me._box_info.appendChild(me._text_title);
		el=me._close_info=document.createElement('div');
		els=me._close_info__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_info__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_info";
		el.ggParameter={ rx:0,ry:0,a:180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : -15px;';
		hs+='top : -15px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._close_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_info.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._close_info.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._close_info.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._close_info.style[domTransition]='right 0s, top 0s';
				if (me._close_info.ggCurrentLogicStatePosition == 0) {
					me._close_info.style.right='1px';
					me._close_info.style.top='1px';
				}
				else {
					me._close_info.style.right='-15px';
					me._close_info.style.top='-15px';
				}
			}
		}
		me._close_info.onclick=function (e) {
			player.setVariableValue('hs_info', false);
			if (player.transitionsDisabled) {
				me._container_info.style[domTransition]='none';
			} else {
				me._container_info.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._container_info.ggParameter.sx=0.1;me._container_info.ggParameter.sy=0.1;
			me._container_info.style[domTransform]=parameterToTransform(me._container_info.ggParameter);
			me._text_info.ggText="";
			me._text_info.ggTextDiv.innerHTML=me._text_info.ggText;
			if (me._text_info.ggUpdateText) {
				me._text_info.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info.ggUpdatePosition) {
				me._text_info.ggUpdatePosition();
			}
			me._text_info.ggTextDiv.scrollTop = 0;
			me._video_1.ggInitMedia("");
		}
		me._close_info.ggUpdatePosition=function (useTransition) {
		}
		me._box_info.appendChild(me._close_info);
		me._container_info.appendChild(me._box_info);
		me.divSkin.appendChild(me._container_info);
		el=me._container_info_c=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="Container_info_c";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 40%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 55%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._container_info_c.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_info_c.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._container_info_c.ggCurrentLogicStateSize != newLogicStateSize) {
				me._container_info_c.ggCurrentLogicStateSize = newLogicStateSize;
				me._container_info_c.style[domTransition]='width 0s, height 0s, opacity 0s';
				if (me._container_info_c.ggCurrentLogicStateSize == 0) {
					me._container_info_c.style.width='98%';
					me._container_info_c.style.height='99%';
					skin.updateSize(me._container_info_c);
				}
				else {
					me._container_info_c.style.width='55%';
					me._container_info_c.style.height='40%';
					skin.updateSize(me._container_info_c);
				}
			}
		}
		me._container_info_c.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('hs_info_c') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._container_info_c.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._container_info_c.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._container_info_c.style[domTransition]='width 0s, height 0s, opacity 0s';
				if (me._container_info_c.ggCurrentLogicStateAlpha == 0) {
					me._container_info_c.style.visibility=me._container_info_c.ggVisible?'inherit':'hidden';
					me._container_info_c.style.opacity=1;
				}
				else {
					me._container_info_c.style.visibility="hidden";
					me._container_info_c.style.opacity=0;
				}
			}
		}
		me._container_info_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._box_info_c=document.createElement('div');
		el.ggId="Box_info_c";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 4px solid #253d8f;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._box_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._box_info_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._info_image_c=document.createElement('div');
		els=me._info_image_c__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._info_image_c.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="info_image_c";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : calc(100% - 20px);';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 45%;';
		hs+='pointer-events:auto;';
		hs+='over-flow: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_image_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_image_c.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._info_image_c.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._info_image_c.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._info_image_c.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._info_image_c.ggCurrentLogicStatePosition == 0) {
					me._info_image_c.style.left='10px';
					me._info_image_c.style.top='0px';
				}
				else {
					me._info_image_c.style.left='5px';
					me._info_image_c.style.top='10px';
				}
			}
		}
		me._info_image_c.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._info_image_c.ggCurrentLogicStateSize != newLogicStateSize) {
				me._info_image_c.ggCurrentLogicStateSize = newLogicStateSize;
				me._info_image_c.style[domTransition]='left 0s, top 0s, width 0s, height 0s';
				if (me._info_image_c.ggCurrentLogicStateSize == 0) {
					me._info_image_c.style.width='calc(100% - 20px)';
					me._info_image_c.style.height='45%';
					skin.updateSize(me._info_image_c);
				}
				else {
					me._info_image_c.style.width='45%';
					me._info_image_c.style.height='calc(100% - 20px)';
					me._info_image_c.style.height='calc(100% - 20px)';
					skin.updateSize(me._info_image_c);
				}
			}
		}
		me._info_image_c.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._info_image_c.clientWidth;
			var parentHeight = me._info_image_c.clientHeight;
			var img = me._info_image_c__img;
			var aspectRatioDiv = me._info_image_c.clientWidth / me._info_image_c.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._box_info_c.appendChild(me._info_image_c);
		el=me._text_info_c=document.createElement('div');
		els=me._text_info_c__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_info_c";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : calc(100% - 50px);';
		hs+='position : absolute;';
		hs+='right : 25px;';
		hs+='top : 30px;';
		hs+='visibility : hidden;';
		hs+='width : calc(50% - 20px);';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #adadad;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='font-size: 15px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 5px 6px 5px 6px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._text_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_info_c.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._text_info_c.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._text_info_c.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._text_info_c.style[domTransition]='right 0s, top 0s, width 0s, height 0s';
				if (me._text_info_c.ggCurrentLogicStatePosition == 0) {
					me._text_info_c.style.right='20px';
					me._text_info_c.style.top='Calc(45% - 25px)';
				}
				else {
					me._text_info_c.style.right='25px';
					me._text_info_c.style.top='30px';
				}
			}
		}
		me._text_info_c.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._text_info_c.ggCurrentLogicStateSize != newLogicStateSize) {
				me._text_info_c.ggCurrentLogicStateSize = newLogicStateSize;
				me._text_info_c.style[domTransition]='right 0s, top 0s, width 0s, height 0s';
				if (me._text_info_c.ggCurrentLogicStateSize == 0) {
					me._text_info_c.style.width='calc(100% - 40px)';
					me._text_info_c__text.style.width='100%';
					me._text_info_c.style.height='56%';
					me._text_info_c__text.style.height='100%';
					skin.updateSize(me._text_info_c);
				}
				else {
					me._text_info_c.style.width='calc(50% - 20px)';
					me._text_info_c__text.style.width='100%';
					me._text_info_c.style.height='calc(100% - 50px)';
					me._text_info_c__text.style.width='100%';
					me._text_info_c.style.height='calc(100% - 50px)';
					skin.updateSize(me._text_info_c);
				}
			}
		}
		me._text_info_c.ggUpdatePosition=function (useTransition) {
		}
		me._box_info_c.appendChild(me._text_info_c);
		el=me._text_info_c2=document.createElement('div');
		els=me._text_info_c2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_info_c2";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 95%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 95%;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 2px #adadad;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._text_info_c2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_info_c2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._box_info_c.appendChild(me._text_info_c2);
		el=me._close_info_c=document.createElement('div');
		els=me._close_info_c__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_info_c__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_info_c";
		el.ggParameter={ rx:0,ry:0,a:180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : -15px;';
		hs+='top : -15px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._close_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_info_c.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._close_info_c.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._close_info_c.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._close_info_c.style[domTransition]='right 0s, top 0s';
				if (me._close_info_c.ggCurrentLogicStatePosition == 0) {
					me._close_info_c.style.right='1px';
					me._close_info_c.style.top='1px';
				}
				else {
					me._close_info_c.style.right='-15px';
					me._close_info_c.style.top='-15px';
				}
			}
		}
		me._close_info_c.onclick=function (e) {
			player.setVariableValue('hs_info_c', false);
			if (player.transitionsDisabled) {
				me._container_info_c.style[domTransition]='none';
			} else {
				me._container_info_c.style[domTransition]='all 700ms ease-out 0ms';
			}
			me._container_info_c.ggParameter.sx=0.1;me._container_info_c.ggParameter.sy=0.1;
			me._container_info_c.style[domTransform]=parameterToTransform(me._container_info_c.ggParameter);
			me._text_info_c.ggText="";
			me._text_info_c.ggTextDiv.innerHTML=me._text_info_c.ggText;
			if (me._text_info_c.ggUpdateText) {
				me._text_info_c.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._text_info_c.ggUpdatePosition) {
				me._text_info_c.ggUpdatePosition();
			}
			me._text_info_c.ggTextDiv.scrollTop = 0;
		}
		me._close_info_c.ggUpdatePosition=function (useTransition) {
		}
		me._box_info_c.appendChild(me._close_info_c);
		me._container_info_c.appendChild(me._box_info_c);
		me.divSkin.appendChild(me._container_info_c);
		el=me._container_map_4d=document.createElement('div');
		el.ggId="Container_map_4d";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_map_4d.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_map_4d.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._container_map_4d.ggCurrentLogicStateSize != newLogicStateSize) {
				me._container_map_4d.ggCurrentLogicStateSize = newLogicStateSize;
				me._container_map_4d.style[domTransition]='width 0s, height 0s, opacity 500ms ease 0ms';
				if (me._container_map_4d.ggCurrentLogicStateSize == 0) {
					me._container_map_4d.style.width='100%';
					me._container_map_4d.style.height='100%';
					skin.updateSize(me._container_map_4d);
				}
				else {
					me._container_map_4d.style.width='100%';
					me._container_map_4d.style.height='100%';
					skin.updateSize(me._container_map_4d);
				}
			}
		}
		me._container_map_4d.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('map_4d') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_map_4d.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_map_4d.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_map_4d.style[domTransition]='width 0s, height 0s, opacity 500ms ease 0ms';
				if (me._container_map_4d.ggCurrentLogicStateVisible == 0) {
					me._container_map_4d.style.visibility=(Number(me._container_map_4d.style.opacity)>0||!me._container_map_4d.style.opacity)?'inherit':'hidden';
					me._container_map_4d.ggVisible=true;
				}
				else {
					me._container_map_4d.style.visibility="hidden";
					me._container_map_4d.ggVisible=false;
				}
			}
		}
		me._container_map_4d.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('map_4d') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._container_map_4d.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._container_map_4d.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._container_map_4d.style[domTransition]='width 0s, height 0s, opacity 500ms ease 0ms';
				if (me._container_map_4d.ggCurrentLogicStateAlpha == 0) {
					me._container_map_4d.style.visibility=me._container_map_4d.ggVisible?'inherit':'hidden';
					me._container_map_4d.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._container_map_4d.style.opacity == 0.0) { me._container_map_4d.style.visibility="hidden"; } }, 505);
					me._container_map_4d.style.opacity=0;
				}
			}
		}
		me._container_map_4d.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._map_loading=document.createElement('div');
		els=me._map_loading__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._map_loading.ggUpdatePosition();}
		el.ggText=basePath + "assets/icon/Rolling-1s-200px.png";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 16px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_loading.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._map_loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._map_loading.clientWidth;
			var parentHeight = me._map_loading.clientHeight;
			var img = me._map_loading__img;
			var aspectRatioDiv = me._map_loading.clientWidth / me._map_loading.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._container_map_4d.appendChild(me._map_loading);
		el=me._background_map4d=document.createElement('div');
		el.ggId="background_map4d";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #000000;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._background_map4d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._background_map4d.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._iframe_map4d=document.createElement('div');
		els=me._iframe_map4d__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="iframe_map4d";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : calc(100% - 50px);';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._iframe_map4d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._iframe_map4d.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._background_map4d.appendChild(me._iframe_map4d);
		el=me._close_map4d=document.createElement('div');
		els=me._close_map4d__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_map4d__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_map4d";
		el.ggParameter={ rx:0,ry:0,a:180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 16px;';
		hs+='position : absolute;';
		hs+='right : 4px;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 16px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._close_map4d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_map4d.onclick=function (e) {
			player.setVariableValue('map_4d', false);
			me._iframe_map4d.ggText="";
			me._iframe_map4d.ggTextDiv.innerHTML=me._iframe_map4d.ggText;
			if (me._iframe_map4d.ggUpdateText) {
				me._iframe_map4d.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._iframe_map4d.ggUpdatePosition) {
				me._iframe_map4d.ggUpdatePosition();
			}
			me._iframe_map4d.ggTextDiv.scrollTop = 0;
		}
		me._close_map4d.ggUpdatePosition=function (useTransition) {
		}
		me._background_map4d.appendChild(me._close_map4d);
		me._container_map_4d.appendChild(me._background_map4d);
		me.divSkin.appendChild(me._container_map_4d);
		el=me._container_callout=document.createElement('div');
		el.ggId="Container_callout";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 70%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 70%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._container_callout.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_callout.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._container_callout.ggCurrentLogicStateSize != newLogicStateSize) {
				me._container_callout.ggCurrentLogicStateSize = newLogicStateSize;
				me._container_callout.style[domTransition]='width 0s, height 0s';
				if (me._container_callout.ggCurrentLogicStateSize == 0) {
					me._container_callout.style.width='100%';
					me._container_callout.style.height='100%';
					skin.updateSize(me._container_callout);
				}
				else {
					me._container_callout.style.width='70%';
					me._container_callout.style.height='70%';
					skin.updateSize(me._container_callout);
				}
			}
		}
		me._container_callout.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('callout_gallery') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_callout.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_callout.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_callout.style[domTransition]='width 0s, height 0s';
				if (me._container_callout.ggCurrentLogicStateVisible == 0) {
					me._container_callout.style.visibility=(Number(me._container_callout.style.opacity)>0||!me._container_callout.style.opacity)?'inherit':'hidden';
					me._container_callout.ggVisible=true;
				}
				else {
					me._container_callout.style.visibility="hidden";
					me._container_callout.ggVisible=false;
				}
			}
		}
		me._container_callout.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._callout_loading=document.createElement('div');
		els=me._callout_loading__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._callout_loading.ggUpdatePosition();}
		el.ggText=basePath + "assets/icon/Rolling-1s-200px.png";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="callout_loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 16px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._callout_loading.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._callout_loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._callout_loading.clientWidth;
			var parentHeight = me._callout_loading.clientHeight;
			var img = me._callout_loading__img;
			var aspectRatioDiv = me._callout_loading.clientWidth / me._callout_loading.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			currentWidth = img.naturalWidth;
			currentHeight = img.naturalHeight;
			img.style.width = currentWidth + 'px';
			img.style.height = currentHeight + 'px';
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._container_callout.appendChild(me._callout_loading);
		el=me._background_callout=document.createElement('div');
		el.ggId="background_callout";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #2b2b2b;';
		hs+='border : 3px solid #00aaff;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._background_callout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._background_callout.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._gallery_callout=document.createElement('div');
		els=me._gallery_callout__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="gallery_callout";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 100%;';
		hs+='height: 100%;';
		hs+='border: 0px solid #00aaff;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._gallery_callout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gallery_callout.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._background_callout.appendChild(me._gallery_callout);
		el=me._close_gallery_callout=document.createElement('div');
		els=me._close_gallery_callout__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPGltYWdlIGhlaWdodD0iMTI5IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlFQUFBQ0JDQVlBQUFEbm9ObFFBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBTDQwbEVRVlI0WHUyZGExdmJPQk9HYjRjVWFCZTJoOTM5L3ovd2JidTBVTW9wOGZ0QmV0QllzZU1rVGl5Ym5lZTZkQ1dFa0'+
			'9od2V6UWFqVXhWMXpXdS83WVdmVzl3dlgwNUJDNkh3T1VRdUhBSVhEZ0VMaHdDRnc2QkM0ZkFoVVBnd2lGdzRSQzRjQWhjT0FRdUhBSVhEb0VMaDhDRlErRENJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNBSEx2amVNcmFxcXFxN2YxVE02T0RtbmRsUlRxRS9XWVZVc3VlcFl3ZzlUcUhpbXViYWpPQVN4NDlvSzhWRVZyUE15aFE2VTV0eU9vaENZamx1WXh6UHpYS3FCZFZZbTBZa3RnNy9JaXJVR3F2ZktQRjlUdUEzRmZJSU1nRE5UbHZIUmR1Q2EwSEVyNE1VOFg4ZlBLbUpXTXdCc081Ym11V0RXZ09kdEFGaVhhZ01VZ3FBRmdDWHdEamlQaisvaWE0SkFIZmNNUE1YSEJneGpkMklIeEhr'+
			'N0JBTUVDTlFHMnc1cDlEWklSU0NJVWllZUVUcnNBbmdQWE1ibjU2U3JTSjMzQ0R6RThoU0xORm9uZGtCOEhzc2xxUTBDQVlJVmVDSzFRWURMUWxpL1lWU1Zoa0NkZUU0QTRBOVRMa2oxV3hFNjdqZHdUK2pjZTVwejhRcFluUm9FQTRDOStqWDRIMHdSMExJRUx3UUFmdEcwRHJKbUo2dHpuMGFISUp0SHJRbTlKQXorUitBNlBqK1A3M3NoUVBBTHVJM3Z0MzZEZGI1T0JrSUxBREw5QXZpS1VIZlYvNUxRdnBwZ0JYN1JCRnRUZy95YjZsUjEzNmJSSVlqS1FkQjA4QWVoQXovSHgvZng5NExnanRDeDU0UzZ0MEVBSndDaEF3Qk5ZVmZBbndTQVZhNUlFS3dJVnV3OGZweXN3Z05wTmFSeXREcnZxbElRU0ZwR3'+
			'lhUmFFRDRST3ZJZDRTcDVKRmdCemJXMjg5cDBOQkI2QUxnbUFQRFpsRS94OVF0Qys1NEpBRU93Q1BjMFFTNGF2aThKUVdVZTVSOElCbnQxWGNiM1BjZlh1eUJvZzJFd0NGc0ErRUNvNDBmQ3dQOFZ5eGVTSlhnWFArWWhQajdTYmNXNllENjVTa0xRTlRCMmlwQ3p0U1JZQTAwRlhmNUFtdzRHWVVjQXZoQUcvMjhTQkg4U2dGMFFURCtFNlVEZ3RtbnYraDFMSlNHQTlnREtTeXpyK0o0bFlmQXJtZ0RrMGJodE1Pd053ZzRBZkNKWmdIOElFT1JXb0NaWmdUV3BiYmE5aWh3V1V5a0lGUEsxQUR5VFlnQVBCTlA1VEZwRGE4M2RCOEJnSDZFSGdHdlNGUEMzS1grUi9KaUwrUGVxZng3amVLQVo4TEpoOE5FMU9n'+
			'UjFYZGVoanhzUXFKTitFNVpSZHdRblVHdHR6YVBiVmdTN3FCZUVBUUI4SnEwSU5BMDhFOXFrOXR3UjJ2ZWJCSGtEZ2wwZ1BiWkdoOEJJRUx3UVBPWUhndGQ4UzRxNEtYSm9wNEF6a3JONGlEcEJPQklBWjRTQmZTUU0ray9nQjNBVEgyOEo3VlRVVTFQZjZJTXZUUUVDV1lJSDByNkIzVVBJZlFCMXRQeUVRN1FCd2tBQXRCd1VBSXBwL0FDK3gvSXZteERrbHFDSWlrQ1FUUW55Q2JSK1BpTnR2T1FBYU5BRndnV0hheFhySUIwYmdCdkM0SCtMUlJEY0Vkb3BLNkNRY1pHcEFBcEJBSzhnV0d2d1JCaUlmTkRiNXYrSzFQRkRRTkFWcU84ZENvQ21nSDhKQS84MUZrSHdrK0FUYUNwNHRRS2xBSUNDRUVTcDRkcF'+
			'h6d2UrendFY0FrSkZ1Z3BsQlpZTUErQ1dKZ0Qvb3duQUhjRXAzTEFDRkZSUkNNeTBvSmpBdG9Idmd1RVFFQ3JDb0MwSTN5MHJZRVBCUXdHUUJmaE84Z1Z5QUlwYkFTZ01BV3lBSUlzZ1ZkbGpsL1lGUWVaZjYvZ0ZLVUpwUThGREFQaEswdzlvWFJhV0JnQW1BQUUwUU1naDJFZTdnQ0Fyb3l2L2lRVEJPV0h6U3B0QkNnVVBBZUNHNUFoYUFGWk1CQUNZQ0FTd0V3aDkxZ0RhUWNpbkYwR3dKQXpNeXZ5TndzRmZDSVAvRHlrU3VDOEFkaVV3V1FCZ1FoREFUaURzb20wV3dRSndRZkRTQmNFbGFRdmJiZ2dkQ29EaUFaTUdBQ1lHQVp3Y0JFMEQycTcrVFlKQURxRWd5UE1DM2lRQU1FRUk0T2dnS01Sc2ZRRXRB'+
			'OXNzd1VmQzROdnNvQVZ2RkFDWUtBUXdDQVE3LzJzQUZXSldNRWlyZ053blVGYlROUUdTQzlJeVVnRGM4SVlBZ0FsREFBZURrRHVRQ2pFclgxRVFYTE81T2xBU2kzWXVGVkI2NEkwQ0FCT0hBQTRHUWRMSzREMXBLMXIrZ0lJMmloanFkL2FzZ0JKQ3RSZndqUkFGZkRNQXdBd2dnTDFBc01FbHUvV3NrTEQyQmJSeHBVZ2w1cjBWS1JGRW0xby9DQU51STRGdkFnQ1lDUVN3TXdoNU1Fam1YOXZURjZUOGhMYTRnK0NRbGNpbkFZV0Izd3dBTUNNSVlDc0lkdkFWQjlDZzYxalllOElneXdtMFdVbzJ3ZVV4L3Z4TVNuSlJVb2lLM1F5YU5RQXdNd2lnRllTS3RCa2tzNitOSUNXRnlnbGMwWnovbHlRSWxCV3M5eW'+
			'5iU2FlZVZPNUkyOEdQTkEvR3pnNEFtQ0VFMEFCQm0wN2FETElIUG4rVEJzcW1jVUd5RmhZQ1NDRFl0TGV1ejdOWC8yUTJndzdSb3U4TkU1ZjI0dGVtckZwS25yNVYwWnhDN00rU1ByZnI4MVNLNXdNTTFkd2h5SDBCNnhEYW9vR1dhcG9BMlorbDNNSE1QMDhsaDJkMm11VjBZSkpDODFXQWRRYnpleDNJRVlSazdxSHBFK1RUeGJiUDA3bUJWNGo2MHRtbnF0bEIwSklWTEVmd2tzM2o0ZGVrSStKYUdsb244SVhOMVlGV0VJb2dLcFI4VDFvTmRCMGE2VDNYTUVYTkNvSXRhZUgyQU9zblV6NlM5Z0hleGI5ZGtaeTdYSW9UVlBIOXlqVnNjekM3L0lIWmdUQWJDUFk0RjZBRG9qWVg0SkxRMWpWaElEWFkyeUtH'+
			'UzlJZXc4WktnTzNPNEt4QW1BVUVld0JnVThJK3g5Yy9rRzRPb1hsY3k4bSt2WVB6K1BkMlJhQ0I3UnZnMllBd2VRajJBRUNEYjFQQ3J1SjdLemFQdXluM3YyOFhVWHNOaHd6bUxFQ1lOQVFIQUpDbmhPVUpJUW9EM3hLaWZydm1FK1JuSC9jWjFNbURNRmtJamdDQVRRaXhad1B0d2RDMnpDSjdSckFtZ1dSVDFmWWQwRW1ETUVrSUJnQ3dMUzM4aHBRV2RrTTZEQ0lJM3BOMkJQTW9ZMWZPNGo2YUxBaVRnK0NFQUNnanlFS1FXd0tkRU1wWER2Q0dRWmdVQkNjR1FCbEIzMG1IUW5LZlFJR2dmSzlCZXBNZ1RBYUNIZ0N1T0F5QVBDdjRHODNUd2ZucW9BMkFmR1d3RHdoZEF6MHBFQ1lCd1E0QWZHSTRBRFluOE'+
			'k3a0FBcUNqVnZIMEsxOVFPalNaRUFvRG9FQlFCRzdQQlI4REF1UUo0VnFEMENEdm1ELzI4YnNDa0pYY0ttRzhXN0t2VTFGSVdnQlFGRTdlenpjM2lmd0dBQm9CV0R2RDZCUWNaOEZ5TlVIUXR0bjFUUy9wemdJUlNFQTdEUmdBZEJta0VMQnVrL2dzUURJVFgvRi9nQklmU0JBYytCekNMb3N4V2dxQmtHTEZiQmJ0OXVPaHlzVVBCUUFXUUU0SEFESmd0Qm05bTNKZHlEWEJHdFFsYklHUlNBd0FPUldZTnY5Z3JVWG9CTkZnd0d3blI2cXhJckRKUkFVWXM0SFhkOXJFMU1iMXFqVXRGQUVncWpjR2RUbWpZMEhmS0Y1cTFnTGdFTEJnd0VndmpBUWhKcFV2MHMyQVhnbTdWN3FlVmR5eXFpYUFnU3lBamtFU2dy'+
			'NWt6UUZhRFBvcUFCSVJ3QUJtbnNOVjRUUFV0YXlNcGZ6SkJXQlVFU2pRNUJOQlczTFFwc2lkaFZmVTFaUTI5bkFvd0FnRFFSQlYvTUZ2R1lueWRHMXQreTlJLzBibnpOTXdtcUpLV0YwQ0tMYWxvYWFFbFF1NG1zTFFzZktoR28zOER0aDRPMXQ0aFFPUGdnQWFRY1E3T2ZrejljMDczSytJRUZ1MjZma2xRWUUyZWVOb2xJUVNEa0llbHlTTW9OMUpuQk51SnAra3U0VStwWG1iZUlHQXlEdEFBSzBBeUFmSVA5L0I1cjZiRHN0QU1WVUVvS3VodGNrUityQnZKNWJnVzgwVHdjZkRRQnBSeENndVJLUUR5QnJBSnM1Q20wcUJrSkpDR3J6cUE1VUNwaHVEMDk4dm1ZekwwRGxKODFROEZFQWtIcEF5TnNnZUI4Sj'+
			'laRXpLNER0elN6ekZjR2dlZzVSU1FnZ21VOTc3dThYS1RIMGtXQXlOU1hJRXFpTWNqcDRCNHZRQnNFdlVwYnppbERIVzFKYVc1NitYa3lsSUtqcDdqalY2WW1VN0NrSTdBbmhPOUkva01nUGlCNE5BR2tMQ0cyV1RNQUtnanErcnZvTEJEdEZXS3N3cWthSHdIU21BRkFLK0FQaHFpZStkaytxMzRwME12amVGR1VNMnlqYzBRR1FPa0RJL1FHMVJSRFlOZ2wwSFcyM0FhT2FFOVo5bTBhSHdDaDNwT1FZclFpZGRVNXpoU0Jyb1dETEU1dkJscE4zWWdaQ25SVnIxUlFIVUIrdjJUenFibFBaVGxydmJTb05nZTA0dmFZcmFVa1RESHRveEY1Qm93RWdHUkRzWEc0dDJ4UE5PSUIrcnpiWWRsaVlpcWdJQkQyZCtN'+
			'em0rcmxyQStiVnd4NExBQ2xyZzZ5YTZ2bENhSVBhZ1hsUDNvYlJJYzVWRmZwZVlHTTcyUWFPOUZ5eW5henlhb1pMZFI1c2hNRlZiMXZzK2wvMXRnQVhCUUFLUXdDdG5hZ0N6VEJxUHY4VzdiaGNjMjVIY1FqZ3RRTmZmNlI1OVVpTmViTjB4N1ZwcnUyWUJBUldXVWMyTklVTzIxVnphc2ZrSUhDTkwrdDh1ZjZqY2doY0RvSExJWERoRUxod0NGdzRCQzRjQWhjT2dRdUh3SVZENE1JaGNPRVF1SEFJWERnRUxod0NGdzZCQzRmQWhVUGd3aUZ3NFJDNGNBaGNPQVF1SEFJWERvRUxoOENGUStBQy9nK1gvNE4vdlpxY1FRQUFBQUJKUlU1RXJrSmdnZz09IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzMuNSAtMz'+
			'IuNSkiIHdpZHRoPSIxMjkiLz4KIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02LjgsNjAuMWEzLjIsMy4yLDAsMCwxLTIuMS0uOCwzLDMsMCwwLDEsMC00LjFMNTUuMiw0LjdhMywzLDAsMCwxLDQuMSwwLDMsMywwLDAsMSwwLDQuMUw4LjgsNTkuM0EzLjIsMy4yLDAsMCwxLDYuOCw2MC4xWiIvPgogPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU3LjIsNjAuMWEzLDMsMCwwLDEtMi0uOEw0LjcsOC44YTMsMywwLDAsMSwwLTQuMSwzLDMsMCwwLDEsNC4xLDBMNTkuMyw1NS4yYTMsMywwLDAsMSwwLDQuMUEzLjQsMy40LDAsMCwxLDU3LjIsNjAuMVoiLz4KPC9zdmc+Cg==';
		me._close_gallery_callout__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close gallery_callout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : -15px;';
		hs+='top : -15px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_gallery_callout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_gallery_callout.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._close_gallery_callout.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._close_gallery_callout.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._close_gallery_callout.style[domTransition]='right 0s, top 0s, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_gallery_callout.ggCurrentLogicStatePosition == 0) {
					me._close_gallery_callout.style.right='0px';
					me._close_gallery_callout.style.top='0px';
				}
				else {
					me._close_gallery_callout.style.right='-15px';
					me._close_gallery_callout.style.top='-15px';
				}
			}
		}
		me._close_gallery_callout.logicBlock_angle = function() {
			var newLogicStateAngle;
			if (
				((me.elementMouseOver['close_gallery_callout'] == true))
			)
			{
				newLogicStateAngle = 0;
			}
			else {
				newLogicStateAngle = -1;
			}
			if (me._close_gallery_callout.ggCurrentLogicStateAngle != newLogicStateAngle) {
				me._close_gallery_callout.ggCurrentLogicStateAngle = newLogicStateAngle;
				me._close_gallery_callout.style[domTransition]='right 0s, top 0s, ' + cssPrefix + 'transform 300ms ease 0ms';
				if (me._close_gallery_callout.ggCurrentLogicStateAngle == 0) {
					me._close_gallery_callout.ggParameter.a = 90;
					me._close_gallery_callout.style[domTransform]=parameterToTransform(me._close_gallery_callout.ggParameter);
				}
				else {
					me._close_gallery_callout.ggParameter.a = 0;
					me._close_gallery_callout.style[domTransform]=parameterToTransform(me._close_gallery_callout.ggParameter);
				}
			}
		}
		me._close_gallery_callout.onclick=function (e) {
			player.setVariableValue('callout_gallery', false);
			if (player.transitionsDisabled) {
				me._container_callout.style[domTransition]='none';
			} else {
				me._container_callout.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._container_callout.ggParameter.sx=0.1;me._container_callout.ggParameter.sy=0.1;
			me._container_callout.style[domTransform]=parameterToTransform(me._container_callout.ggParameter);
			me._gallery_callout.ggText="";
			me._gallery_callout.ggTextDiv.innerHTML=me._gallery_callout.ggText;
			if (me._gallery_callout.ggUpdateText) {
				me._gallery_callout.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._gallery_callout.ggUpdatePosition) {
				me._gallery_callout.ggUpdatePosition();
			}
			me._gallery_callout.ggTextDiv.scrollTop = 0;
		}
		me._close_gallery_callout.onmouseover=function (e) {
			me.elementMouseOver['close_gallery_callout']=true;
			me._close_gallery_callout.logicBlock_angle();
		}
		me._close_gallery_callout.onmouseout=function (e) {
			me.elementMouseOver['close_gallery_callout']=false;
			me._close_gallery_callout.logicBlock_angle();
		}
		me._close_gallery_callout.ontouchend=function (e) {
			me.elementMouseOver['close_gallery_callout']=false;
			me._close_gallery_callout.logicBlock_angle();
		}
		me._close_gallery_callout.ggUpdatePosition=function (useTransition) {
		}
		me._background_callout.appendChild(me._close_gallery_callout);
		me._container_callout.appendChild(me._background_callout);
		me.divSkin.appendChild(me._container_callout);
		el=me._bg_intro=document.createElement('div');
		els=me._bg_intro__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._bg_intro.ggUpdatePosition();}
		el.ggText=basePath + "assets/img/bg_intro.jpg";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="bg_intro";
		el.ggDx=-1;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 101%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 101%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._bg_intro.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._bg_intro.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_intro') == false))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._bg_intro.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._bg_intro.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._bg_intro.style[domTransition]='' + cssPrefix + 'transform 400ms ease 0ms, opacity 400ms ease 0ms';
				if (me._bg_intro.ggCurrentLogicStateScaling == 0) {
					me._bg_intro.ggParameter.sx = 1.5;
					me._bg_intro.ggParameter.sy = 1.5;
					me._bg_intro.style[domTransform]=parameterToTransform(me._bg_intro.ggParameter);
				}
				else {
					me._bg_intro.ggParameter.sx = 1;
					me._bg_intro.ggParameter.sy = 1;
					me._bg_intro.style[domTransform]=parameterToTransform(me._bg_intro.ggParameter);
				}
			}
		}
		me._bg_intro.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('var_intro') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._bg_intro.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._bg_intro.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._bg_intro.style[domTransition]='' + cssPrefix + 'transform 400ms ease 0ms, opacity 400ms ease 0ms';
				if (me._bg_intro.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._bg_intro.style.opacity == 0.0) { me._bg_intro.style.visibility="hidden"; } }, 405);
					me._bg_intro.style.opacity=0;
				}
				else {
					me._bg_intro.style.visibility=me._bg_intro.ggVisible?'inherit':'hidden';
					me._bg_intro.style.opacity=1;
				}
			}
		}
		me._bg_intro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._bg_intro.clientWidth;
			var parentHeight = me._bg_intro.clientHeight;
			var img = me._bg_intro__img;
			var aspectRatioDiv = me._bg_intro.clientWidth / me._bg_intro.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			} else {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		el=me._rec_bg_intro=document.createElement('div');
		el.ggId="Rec_Bg_intro";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 101%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 101%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_bg_intro.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rec_bg_intro.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._container_hd=document.createElement('div');
		el.ggId="Container_HD";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 550px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 500px;';
		hs+='pointer-events:none;';
		hs+='border-radius: 20px; box-shadow: rgb(255 255 255) 0px 0px 15px 2px;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_hd.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._container_hd.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getViewerSize().width < 480)) || 
				((player.getViewerSize().height < 480))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getViewerSize().width < 640)) || 
				((player.getViewerSize().height < 640))
			)
			{
				newLogicStateScaling = 1;
			}
			else if (
				((player.getViewerSize().width < 800)) || 
				((player.getViewerSize().height < 800))
			)
			{
				newLogicStateScaling = 2;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._container_hd.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._container_hd.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._container_hd.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._container_hd.ggCurrentLogicStateScaling == 0) {
					me._container_hd.ggParameter.sx = 0.6;
					me._container_hd.ggParameter.sy = 0.6;
					me._container_hd.style[domTransform]=parameterToTransform(me._container_hd.ggParameter);
				}
				else if (me._container_hd.ggCurrentLogicStateScaling == 1) {
					me._container_hd.ggParameter.sx = 0.7;
					me._container_hd.ggParameter.sy = 0.7;
					me._container_hd.style[domTransform]=parameterToTransform(me._container_hd.ggParameter);
				}
				else if (me._container_hd.ggCurrentLogicStateScaling == 2) {
					me._container_hd.ggParameter.sx = 0.85;
					me._container_hd.ggParameter.sy = 0.85;
					me._container_hd.style[domTransform]=parameterToTransform(me._container_hd.ggParameter);
				}
				else {
					me._container_hd.ggParameter.sx = 1;
					me._container_hd.ggParameter.sy = 1;
					me._container_hd.style[domTransform]=parameterToTransform(me._container_hd.ggParameter);
				}
			}
		}
		me._container_hd.onclick=function (e) {
			player.setVariableValue('var_intro', false);
			player.setVariableValue('var_scale_logo', true);
			player.openNext("{node18}","");
			player.startAutorotate("0.04","10");
		}
		me._container_hd.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(10,107,173,0.784314);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._rectangle_1);
		el=me._hank_touch=document.createElement('div');
		els=me._hank_touch__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTEuOCAyMzYiPgogPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEzMC41LDIxMC43bC03LjItOWMtMjUtMzEuMi0yNS4xLTMxLjItMjUuMy0zMS42QTE4LDE4LDAsMCwxLDEyNi4yLDE0OGwxNi4zLDIwLjIsMTYsMTkuOS04LjQsN2MtLjEsMC04LjEtMTAtMTYuMi0yMGwtMTYtMTkuOWE2LjksNi45LDAsMCwwLTkuNC0uNiw3LDcsMCwwLDAtMS4zLDkuNGMuNi43LD'+
			'E1LjUsMTkuMiwyNC43LDMwLjhsNy40LDkuMVoiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyNS4xLDE2NC4zbC00OC4zLTYwQTE4LDE4LDAsMCwxLDgwLjMsODBhMTcuOCwxNy44LDAsMCwxLDI0LjUsMmwzMi40LDQwLjEtOC42LDYuOEw5Ni41LDg5LjJhNi45LDYuOSwwLDAsMC0xMC43LDguN2MuNywxLDQ3LDU4LjQsNDcuNyw1OS40WiIvPgogICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTYxLjUsMTMwLjFsLTE5LjktMjQuN2ExOCwxOCwwLDAsMSwyOC4yLTIyLjFsMTcuOSwyMi4yLDguNiwxMC43LTguNSw3YzAtLjEtMy45LTQuOS04LjYtMTAuOC03LjUtOS4zLTE3LjItMjEuNC0xNy43'+
			'LTIxLjlhNi44LDYuOCwwLDAsMC05LjQtLjYsNyw3LDAsMCwwLTEuNCw5LjNsMTkuMywyNFoiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0Mi4xLDE0NS44bC0zMi42LTQwLjZBMTgsMTgsMCwwLDEsMTM3LjcsODNsMzIuNCw0MC4zLTguNyw2LjctMzItMzkuOEE3LDcsMCwwLDAsMTE4LjYsOTlsMzIsMzkuN1oiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE4My41LDIzNmE2MC4xLDYwLjEsMCwwLDEtNy40LS40LDY4LjIsNjguMiwwLDAsMS00NS44LTI1bDguNi02LjlhNTcuMSw1Ny4xLDAsMCwwLDgwLjMsOC43YzIxLjEtMTcuMSwyNy43LTQ2LjYsMTUuNy03MC41LTMuNS00LjMtMz'+
			'AuOC0zOC4zLTMxLjctMzkuM2E2LjksNi45LDAsMCwwLTkuNC0uNyw3LjEsNy4xLDAsMCwwLTEuNCw5LjQsNS42LDUuNiwwLDAsMS0xLjIsNy42Yy0zLjIsMi40LTUuOC44LTcuOC0xLjRoMGwtLjItLjNjLS42LS42LTEuMS0xLjMtMS42LTEuOWwuMy0uM2ExOC4yLDE4LjIsMCwwLDEsNS0yMS43LDE3LjksMTcuOSwwLDAsMSwyNC42LDJsMzIuMyw0MC4xLjYsMWMxNC44LDI4LjUsNyw2NC4xLTE4LjMsODQuNUE2Ny45LDY3LjksMCwwLDEsMTgzLjUsMjM2WiIvPgogICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNNjEsMTI4LjFhNDkuNSw0OS41LDAsMCwxLTE4LjItMTQuMiw1MC42LDUwLjYsMCwxLDEs'+
			'NzguOS02My41LDQ5LjgsNDkuOCwwLDAsMSw5LjcsMTkuN2wtMTAuNiwyLjZhNDAsNDAsMCwwLDAtMzQuMy0zMCwzOS40LDM5LjQsMCwwLDAtMjkuMSw4LjZBMzkuOCwzOS44LDAsMCwwLDQyLjgsNzcuOSwzOS4zLDM5LjMsMCwwLDAsNTEuNCwxMDdhNDAuNiw0MC42LDAsMCwwLDE0LjIsMTEuMloiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY4LjUsMTY0QTgyLjYsODIuNiwwLDEsMSwxNDcsMzAuOGE4MC42LDgwLjYsMCwwLDEsMTMuOCwyNWwtMTAuNCwzLjVhNzAuNiw3MC42LDAsMCwwLTEyLTIxLjZBNzEuNiw3MS42LDAsMSwwLDcwLjMsMTUzLjJaIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz'+
			'4K';
		me._hank_touch__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hank_touch";
		el.ggDx=181;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 213px;';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 106px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hank_touch.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hank_touch.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._hank_touch);
		el=me._hand_zoom=document.createElement('div');
		els=me._hand_zoom__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjkuNCAyMzYiPgogPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQwLjksMmwtMiwyLC41LDEyLjRjLjcsMTkuNS41LDE5LjMsMTguOCwxOC4yLDYuOC0uNCwxMi45LTEsMTMuNi0xLjMsMy42LTIuMSw0LjMtNy44LDEuMy0xMS4zcy0xLjgtMi4yLTEyLjgtMS44bC02LjUuMi0uMi0zLjVDNTMuMSw2LDUyLjcsMy43LDUwLjgsMS44UzQ4LjQsMCw0NiwwLDQyLjYuMy'+
			'w0MC45LDJaIi8+CiAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05OSwxOS41YTI2LjksMjYuOSwwLDAsMC0xMi41LDcuOSwyNy43LDI3LjcsMCwwLDAtLjEsMzcuN2MxLjcsMS45LDMuMywzLjQsMy42LDMuNHMuNi0xLjYuNi0zLjVjLjEtOC4zLDMuNS0xNy41LDcuNS0yMHM4LjktMi4zLDEzLjYtMS4zYzcsMS40LDkuOCw1LjMsMTEuNSwxNiwuNCwyLjQuOSw1LjQsMS4xLDYuNGwuNCwxLjgsMi42LTIuNEEyNi41LDI2LjUsMCwwLDAsMTM1LDQ2LjJjMC0xMS43LTcuMS0yMS44LTE4LjMtMjYuM0MxMTIuMywxOC4yLDEwMy42LDE3LjksOTksMTkuNVoiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0i'+
			'TTEwLjUsNDNjLTYuNi40LTYuOS41LTguNiwyLjVhNy40LDcuNCwwLDAsMC0uNiw5LjFjMS42LDIuNywzLjIsMywxMi40LDIuNWw3LjYtLjQuNiw4LjRjLjYsNy42LjgsOC43LDIuMiwxMC4yczUuMiwyLjgsOC4zLDEuMyw0LjMtMy4xLDMuNC0xNy4xLTEuMy0xNS00LjMtMTYuNFMyMS42LDQyLjMsMTAuNSw0M1oiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwNC40LDUwLjljLTIuNi42LTMuNywxLjktNSw2LjJzLTEuOSwxOC4zLTEuMiwyNC4xYy42LDQsLjQsOS45LTEuNCwzNi0xLDE1LjItMi44LDI1LjUtNS4zLDMwLjItMS4xLDIuNC02LjYsNS4yLTEwLjEsNS4ycy01LjctMi43LTgtNy'+
			'44LTIuMS03LjMtLjQtMTMuN2MzLjMtMTIuOCwyLjEtMTkuNy00LjYtMjQuOS0zLjktMy4xLTQuNy0zLTYuNC45LTksMjAuNi0xMS4yLDI3LjktMTIuNSw0My4xcy4yLDIyLjEsNi45LDQwLjUsMTIuOCwyOS4yLDE5LjUsMzUuNGMxMi4yLDExLjQsMjguNywxMyw0Ni4zLDQuNSw5LjItNC41LDE2LjctMTAuMiwyOC41LTIxLjlzMTQuOC0xNi4xLDE3LjItMjIuOGMxLjItMy41LDIuMS0zNy43LDEtNDEuNXMtMy4xLTUuNS03LjUtNmwtMy42LS40LTEuNi0zLjRjLTIuNy01LjktOC41LTEwLjEtMTQuMS0xMC4xLTEuNiwwLTEuOS0uMy0yLjYtMy4yLTEuNC01LjgtNi42LTktMTMuNy04LjNsLTMuOC4z'+
			'LS40LTJjLS4yLTEuMi0xLjYtMTMuNi0zLjMtMjcuNnMtMy4zLTI2LjYtMy44LTI3LjhDMTEyLjcsNTEuNywxMDkuMSw0OS44LDEwNC40LDUwLjlaIi8+CiAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01Ni41LDczQTI4LjQsMjguNCwwLDAsMCwzOS4zLDg4LjRjLTEuNiwzLjUtMS44LDQuNi0xLjgsMTFzLjEsNy41LDIsMTEuNGEzNiwzNiwwLDAsMCw0LjksNy41bDIuOSwzLjIsNC4xLTguOGM1LjgtMTIuMSwxMC0xOS41LDExLjItMTkuNXMxMC40LDQuNywxMy41LDguMiw1LjYsOC41LDUuNSwxNS4ydjQuOWwyLjItMi4yYzQuNi00LjQsNC44LTQuOSw2LjItMTdMOTEuMyw5MWwtMS43LTMuNGMtMi'+
			'4zLTUuMy03LjgtMTAuNy0xMy40LTEzLjNBMjguMSwyOC4xLDAsMCwwLDU2LjUsNzNaIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._hand_zoom__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hand_zoom";
		el.ggDx=181;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 77px;';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 71px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hand_zoom.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._hand_zoom.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._hand_zoom);
		el=me._mouse_move=document.createElement('div');
		els=me._mouse_move__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOTQuNCAzNTMuNyI+CiA8ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj4KICA8ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPgogICA8cGF0aCBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE0My40LDI5NC41YTc0LjUsNzQuNSwwLDAsMS02OC45LTQ1LjgsNzIuOSw3Mi45LDAsMCwxLTYtMjkuMVYxMzMuOUE3Ni4xLDc2LjEsMCwwLDEsOTAuNSw4MWE3Ni4xLDc2LjEsMCwwLDEsNTIuOS'+
			'0yMmgxMC44YTc2LjEsNzYuMSwwLDAsMSw1Mi45LDIyLDcyLjIsNzIuMiwwLDAsMSwxNiwyMy45LDcyLjEsNzIuMSwwLDAsMSw2LDI5djg1LjdhNzIuOSw3Mi45LDAsMCwxLTYsMjkuMSw3NCw3NCwwLDAsMS0zOS45LDM5LjksNzMuNyw3My43LDAsMCwxLTI5LDUuOVoiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0My40LDE3Ni44aDEwLjhhMTAuOSwxMC45LDAsMCwwLDEwLjctMTAuN1YxMzRhMTAuMywxMC4zLDAsMCwwLTMuMi03LjYsMTAuMiwxMC4yLDAsMCwwLTcuNS0zLjFWNzIuNGEyLjcsMi43LDAsMCwwLTIuNy0yLjdoLTUuNGEyLjcsMi43LDAsMCwwLTIuNywyLjd2NTAuOWExMC4y'+
			'LDEwLjIsMCwwLDAtNy41LDMuMSwxMC4zLDEwLjMsMCwwLDAtMy4yLDcuNnYzMi4xYTEwLjksMTAuOSwwLDAsMCwxMC43LDEwLjdaIi8+CiAgIDxwYXRoIHN0cm9rZT0iI2ZmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMTE4LjksMzIsMTQzLjIsNy4xYTYuOSw2LjksMCwwLDEsOS45LDBsMjQuOCwyNS41Ii8+CiAgIDxwYXRoIHN0cm9rZT0iI2ZmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjYyLjMsMTM0LjRsMjUsMjQuMmE2LjksNi45LDAsMCwxLDAsOS45bC0yNS41LD'+
			'I0LjkiLz4KICAgPHBhdGggc3Ryb2tlPSIjZmZmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0xNzguMSwzMjEuN2wtMjQuMywyNC45YTYuOSw2LjksMCwwLDEtOS45LDBsLTI0LjgtMjUuNSIvPgogICA8cGF0aCBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTMyLDE5My42LDcuMSwxNjkuM2E2LjgsNi44LDAsMCwxLDAtOS44bDI1LjUtMjQuOSIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._mouse_move__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mouse_move";
		el.ggDx=-189;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 189px;';
		hs+='cursor : pointer;';
		hs+='height : 149px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 112px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mouse_move.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_move.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._mouse_move);
		el=me._mouse_zoom=document.createElement('div');
		els=me._mouse_zoom__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjAuNSAyNDUuNSI+CiA8ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj4KICA8ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPgogICA8cGF0aCBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTc5LjksMjQwLjVBNzUuNCw3NS40LDAsMCwxLDI3LDIxOC42YTc2LjEsNzYuMSwwLDAsMS0yMi01M1Y3OS45YTcyLjEsNzIuMSwwLDAsMSw2LTI5QTcyLjcsNzIuNywwLDAsMSwyNywyNyw3Mi4yLD'+
			'cyLjIsMCwwLDEsNTAuOSwxMWE3Mi4xLDcyLjEsMCwwLDEsMjktNkg5MC42YTcyLjIsNzIuMiwwLDAsMSwyOS4xLDYsNzMuOCw3My44LDAsMCwxLDIzLjksMTYsNzIuMiw3Mi4yLDAsMCwxLDE2LDIzLjksNzIuMSw3Mi4xLDAsMCwxLDYsMjl2ODUuN2E3Mi45LDcyLjksMCwwLDEtNiwyOS4xLDc0LjksNzQuOSwwLDAsMS0xNiwyMy45LDc2LjUsNzYuNSwwLDAsMS0yMy45LDE2LDczLjgsNzMuOCwwLDAsMS0yOS4xLDUuOVoiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTc5LjksMTIyLjhIOTAuNmExMC4zLDEwLjMsMCwwLDAsNy42LTMuMiwxMC4yLDEwLjIsMCwwLDAsMy4xLTcuNVY4MEExMC42'+
			'LDEwLjYsMCwwLDAsOTAuNiw2OS4zVjE4LjRhMi44LDIuOCwwLDAsMC0uNy0xLjksMi45LDIuOSwwLDAsMC0xLjktLjhIODIuNmEyLjcsMi43LDAsMCwwLTIuNywyLjdWNjkuM2ExMC4yLDEwLjIsMCwwLDAtNy41LDMuMUExMC4zLDEwLjMsMCwwLDAsNjkuMiw4MHYzMi4xYTEwLjksMTAuOSwwLDAsMCwxMC43LDEwLjdaIi8+CiAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOTAuNiw1NS43di0xNmgtMTJxLTIuMSwwLTIuMS0xLjJhMi4yLDIuMiwwLDAsMSwuOS0xLjVsMTguMy0xOS45YTMuOCwzLjgsMCwwLDEsMi44LTEuMiwzLjYsMy42LDAsMCwxLDIuOCwxLjJMMjE5LjYsMzdhMi41LDIuNSwwLD'+
			'AsMSwuOSwxLjVxMCwxLjItMi4xLDEuMkgyMDYuNXYxNloiLz4KICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5NS43LDEwMi4zLDE3Ny40LDgyLjRhMi4yLDIuMiwwLDAsMS0uOS0xLjVxMC0xLjIsMi4xLTEuMmgxMnYtMTZoMTUuOXYxNmgxMS45cTIuMSwwLDIuMSwxLjJhMi4yLDIuMiwwLDAsMS0uOSwxLjVsLTE4LjMsMTkuOWEzLjYsMy42LDAsMCwxLTIuOCwxLjJBMy44LDMuOCwwLDAsMSwxOTUuNywxMDIuM1oiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._mouse_zoom__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="mouse_zoom";
		el.ggDx=-179;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 77px;';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 89px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mouse_zoom.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._mouse_zoom.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._mouse_zoom);
		el=me._gocnhinthaydoi=document.createElement('div');
		els=me._gocnhinthaydoi__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="gocnhinthaydoi";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 253px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 180px;';
		hs+='height: 20px;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style', hs);
		if (UI_text.english)// thay đổi góc nhìn
		{
			els.innerHTML=UI_text.EN.manual1
		} else
		{
			els.innerHTML=UI_text.VN.manual1
		}
		el.appendChild(els);
		me._gocnhinthaydoi.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._gocnhinthaydoi.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._gocnhinthaydoi);
		el=me._zoom_in_out=document.createElement('div');
		els=me._zoom_in_out__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="zoom_in_out";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 117px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 180px;';
		hs+='height: 20px;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style', hs);
		if (UI_text.english) //phóng to thu nhỏ
		{
			els.innerHTML=UI_text.EN.manual2 
		} else
		{
			els.innerHTML=UI_text.VN.manual2
		}
		el.appendChild(els);
		me._zoom_in_out.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoom_in_out.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._zoom_in_out);
		el=me._tt_click=document.createElement('div');
		els=me._tt_click__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_click";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 7px;';
		hs+='cursor : pointer;';
		hs+='height : 38px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 345px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 345px;';
		hs+='height: auto;';
		hs+='background: #f3db7e;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 12px;';
		hs+=cssPrefix + 'border-radius: 12px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 22px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 3px 4px 3px 4px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style', hs);
		if (UI_text.english) // click bắt đầu
		{
			els.innerHTML=UI_text.EN.manual3
		} else
		{
			els.innerHTML=UI_text.VN.manual3
		}
		el.appendChild(els);
		me._tt_click.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_click.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._tt_click);
		el=me._svg_1=document.createElement('div');
		els=me._svg_1__img=document.createElement('img');
		els.className = 'ggskin ggskin_svg';
		if (UI_text.english)
		{
			me._svg_1__img.setAttribute('src',basePath + 'images/svg_1EN.png'); // logo intro
		} else
		{
			me._svg_1__img.setAttribute('src',basePath + 'images/svg_1.svg'); // logo intro
		}
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 220px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._svg_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._container_hd.appendChild(me._svg_1);
		me._rec_bg_intro.appendChild(me._container_hd);
		me._bg_intro.appendChild(me._rec_bg_intro);
		me.divSkin.appendChild(me._bg_intro);
		el=me._timer_1=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 548px;';
		hs+='position : absolute;';
		hs+='top : 281px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_1.ggIsActive=function() {
			return (me._timer_1.ggTimestamp + me._timer_1.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_1.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_1.style[domTransition]='';
				if (me._timer_1.ggCurrentLogicStateVisible == 0) {
					me._timer_1.style.visibility="hidden";
					me._timer_1.ggVisible=false;
				}
				else {
					me._timer_1.style.visibility=(Number(me._timer_1.style.opacity)>0||!me._timer_1.style.opacity)?'inherit':'hidden';
					me._timer_1.ggVisible=true;
				}
			}
		}
		me._timer_1.ggDeactivate=function () {
			if (
				(
					((me.ggUserdata.tags.indexOf("img") != -1))
				)
			) {
					player.playSound("Element01","1");
			}
		}
		me._timer_1.ggCurrentLogicStateVisible = -1;
		me._timer_1.ggUpdateConditionTimer=function () {
			me._timer_1.logicBlock_visible();
		}
		me._timer_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_1);
		if (
			(
				((player.getIsMobile() == true))
			)
		) {
			player.setVariableValue('map_hide', true);
		}
		me._map_01.ggMarkerInstances=[];
		me._map_01.ggMapId = 'FloorPlan01';
		me._map_01.ggLastNodeId=null;
		me._map_01.callChildLogicBlocksHotspot_map_pin_changenode = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_tt && me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_configloaded = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_tt && me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_active && me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling) {
						me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling();
					}
					if (me._map_01.ggMarkerInstances[i]._map_pin_normal && me._map_01.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling) {
						me._map_01.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_tt && me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_active = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_active && me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha) {
						me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha();
					}
					if (me._map_01.ggMarkerInstances[i]._map_pin_active && me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling) {
						me._map_01.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling();
					}
					if (me._map_01.ggMarkerInstances[i]._map_pin_normal && me._map_01.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha) {
						me._map_01.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_hastouch = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_tt && me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_01.callChildLogicBlocksHotspot_map_pin_activehotspotchanged = function(){
			if(me._map_01.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_01.ggMarkerInstances.length; i++) {
					if (me._map_01.ggMarkerInstances[i]._map_pin_tt && me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_01.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_01.ggMarkerArray=[];
		me._map_01.ggGoogleMarkerArray=[];
		me._map_01.ggLastZoom = -1;
		me._map_01.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_01.ggRadar.update=function() {
			var radar=me._map_01.ggRadar;
			var map=me._map_01.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_01.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_01.ggMapId);
				pan -= me._map_01.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_01.ggFilteredIds.length > 0 && me._map_01.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat) && (gps[1]==radar.activeNodeLatLng.lng)) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = L.latLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.234375;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng;
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat;
					radar_path.push(L.latLng(y, x));
				}
				if (radar.poly) {
					radar.poly.removeFrom(map);
					radar.poly = null;
				}
				radar.poly = L.polygon(radar_path, {
					color: '#ff0000',
					opacity: 0.8,
					weight: 1,
					fill: true,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				}).addTo(map);
			} else {
				if (radar) {
					activeNodeLatLng = L.latLng(0,0);
					if (radar.poly) {
						radar.poly.removeFrom(map);
						radar.poly = null;
					}
				}
			}
		}
		me._map_01.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_01.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_01.ggInitMap=function(keepZoom) {
			me._map_01.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_01.ggMapId);
			var mapDetails = player.getMapDetails(me._map_01.ggMapId);
			if (mapType == 'file') {
				me._map_01.style.backgroundColor = mapDetails['bgcolor'];
				me._map_01.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_01.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_01.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_01.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = L.latLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = L.latLng(0,0);
			}
			if (mapType == 'web') {
				if (me._map_01.ggLastZoom == -1) me._map_01.ggLastZoom = 3;
				var initZoom = keepZoom ? me._map_01.ggLastZoom : 3;
				var maxZoom = ((mapDetails['mapprovider'] == 'openstreetmap') && (mapDetails['mapstyle'] == 'outdoors')) ? 17 : 18;
				if (mapDetails['mapprovider'] == 'custom') maxZoom = mapDetails['mapmaxzoom'];
				var mapOptions = {
					zoom: initZoom,
					zoomControl: false,
					attributionControl: false,
					maxZoom: maxZoom
				};
				me._map_01.ggMap = L.map(me._map_01, mapOptions).setView(activeNodeLatLng, initZoom);
				if (mapDetails['mapprovider'] == 'openstreetmap') {
					if (mapDetails['mapstyle'] == 'streets') {
						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(me._map_01.ggMap);
					} else if (mapDetails['mapstyle'] == 'outdoors') {
						L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{}).addTo(me._map_01.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'mapbox') {
					if (mapDetails['styleurl'] == '') {
						L.tileLayer('https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] +  '/{z}/{x}/{y}@2x.png?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_01.ggMap);
					} else {
						var styleurlstring = mapDetails['styleurl'];
						styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
						L.tileLayer('https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/{z}/{x}/{y}@2x?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_01.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'custom') {
					L.tileLayer(mapDetails['mapurltemplate'],{ maxZoom: mapDetails['mapmaxzoom']}).addTo(me._map_01.ggMap);
				}
			} else if (mapType == 'file') {
				me._map_01.ggCalculateFloorplanDimInDeg(mapDetails);
				var mapCenter = activeNodeLatLng;
				if (mapCenter.lat == 0.0 && mapCenter.lng == 0.0) {
					mapCenter.lat = -me._map_01.mapHeightInDeg / 2;
					mapCenter.lng = me._map_01.mapWidthInDeg / 2;
				}
				if (me._map_01.ggLastZoom == -1) me._map_01.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_01.ggLastZoom : 10;
				var mapOptions = {
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: mapCenter,
					zoomControl: false,
					attributionControl: false
				};
				me._map_01.ggMap = L.map(me._map_01, mapOptions).setView(activeNodeLatLng, initZoom);
				var MapLayer = L.TileLayer.extend({
					getTileUrl: function(coords){
						if (me._map_01.ggTileAvailable(coords.x, coords.y, coords.z)) {
							return basePath + 'images/maptiles/' + me._map_01.ggMapId + '/' + coords.z + '/' + coords.x + '_' + coords.y + '.' + mapDetails['tileformat'];
						} else {
							return '';
						}
					}
				});
				var mapLayer = new MapLayer();
				mapLayer.addTo(me._map_01.ggMap);
				me._map_01.ggMap.on('move zoom', function() {
					me._map_01.ggCheckBounds(mapDetails);
				});
				me._map_01.ggCheckBounds(mapDetails);
			}
		}
		me._map_01.ggClearMap=function() {
		if (me._map_01.ggMap) me._map_01.ggMap.remove();
		me._map_01.ggMap = null;
		me._map_01.ggClearMapMarkers();
		me._map_01.ggMapNotLoaded = true;
		}
		me._map_01.ggClearMapMarkers=function() {
			me._map_01.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_01.ggMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.removeFrom(me._map_01.ggMap);
				}
			}
			me._map_01.ggMarkerArray=[];
			me._map_01.ggMarkerInstances=[];
			me._map_01.ggLastActivMarker = null;
		}
		me._map_01.ggCenterNode=function() {
			if (!me._map_01.ggMap) return;
			var gps;
			if (player.getMapType(me._map_01.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_01.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = L.latLng(gps[0], gps[1]);
				me._map_01.ggMap.panTo(markerLocation, {animate: false});
			}
		}
		me._map_01.ggFitBounds=function(force) {
			if (me._map_01.ggMapNotLoaded) return;
			if (me._map_01.ggMarkerBounds.isValid()) {
				if (me._map_01.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_01.ggGoogleMarkerArray).length > 1) {
					if (force) {
					me._map_01.ggMap.zoomOut(1, {animate: false});
					me._map_01.ggMap.fitBounds(me._map_01.ggMarkerBounds, {padding: [30, 30], animate: false});
					} else {
						if (player.getMapType(me._map_01.ggMapId) == 'web') {
							me._map_01.ggMap.setZoom(3);
						} else {
							me._map_01.ggMap.setZoom(7 + 3);
						}
					}
				} else {
					me._map_01.ggMap.setView(me._map_01.ggMarkerBounds.getCenter(), me._map_01.ggMap.getZoom());
					if (player.getMapType(me._map_01.ggMapId) == 'web') {
						if (force) {
						me._map_01.ggMap.setZoom(18);
						} else {
							me._map_01.ggMap.setZoom(3);
						}
					} else {
						if (force) {
						me._map_01.ggMap.setZoom(7);
						} else {
							me._map_01.ggMap.setZoom(7 + 3);
						}
					}
				}
			}
		}
		me._map_01.ggInitMapMarkers=function(updateMapBounds) {
			L.SkinMarkerLayer = L.Layer.extend({
				initialize: function(div, pos) {
					this._div = div;
					this._pos = pos;
				},
				onAdd: function(map) {
					this.options.pane = 'markerPane';
					var pane = map.getPane(this.options.pane);
					pane.appendChild(this._div);
					this._div.style.left = -18 + 'px';
					this._div.style.top = -36 + 'px';
					this._update();
					map.on('zoomstart', this._zoomStart, this);
					map.on('zoomend', this._zoomEnd, this);
					map.on('zoomend viewreset', this._update, this);
				},
				onRemove : function(map) {
					L.DomUtil.remove(this._div);
					map.off('zoomend viewreset', this._update, this);
				},
				_zoomStart: function() {
						this._div.style.visibility = 'hidden';
				},
				_zoomEnd: function() {
						this._div.style.visibility = 'inherit';
				},
				_update : function() {
					var point = this._map.latLngToLayerPoint(this._pos);
					L.DomUtil.setPosition(this._div, point);
				}
			});
			me._map_01.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_01.ggFilteredIds = [];
			if (me._map_01.ggFilter != '') {
				var filter = me._map_01.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_01.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_01.ggFilteredIds.length > 0) ids = me._map_01.ggFilteredIds;
			}
			var nodeSortObjs = [];
			for (var i=0; i<ids.length;i++) {
				var gps;
				if (player.getMapType(me._map_01.ggMapId) == 'web') {
					gps=player.getNodeLatLng(ids[i]);
				} else {
					gps=player.getNodeMapCoords(ids[i], me._map_01.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					var nodeSortObj = {};
					nodeSortObj['id'] = ids[i];
					nodeSortObj['lat'] = gps[0];
					nodeSortObj['lng'] = gps[1];
					nodeSortObjs.push(nodeSortObj);
				}
			}
			nodeSortObjs.sort(function(a, b){if (a['lat'] == b['lat']) return a['lng'] - b['lng']; else return b['lat'] - a['lat']});
			ids = [];
			for (var i=0; i<nodeSortObjs.length;i++) {
				ids.push(nodeSortObjs[i]['id']);
			}
			var marker;
			var markerLocation;
			me._map_01.ggMarkerBounds = L.latLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_01.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_01.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = L.latLng(gps[0], gps[1]);
					var markerParent = new Object();
					markerParent.ggElementNodeId=function() { return id };
					var div=new SkinElement_map_pin_Class(me, markerParent);
					marker=new L.SkinMarkerLayer(div._map_pin,markerLocation);
					marker.addTo(me._map_01.ggMap);
					me._map_01.ggMarkerArray[id]=marker;
					me._map_01.ggMarkerInstances.push(div);
					me._map_01.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && me._map_01.ggMarkerBounds.isValid() && updateMapBounds) {
				me._map_01.ggFitBounds(false);
			}
			skin.updateSize(me._map_01);
		me._map_01.callChildLogicBlocksHotspot_map_pin_changenode();
		me._map_01.callChildLogicBlocksHotspot_map_pin_configloaded();
		me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_01.callChildLogicBlocksHotspot_map_pin_active();
		me._map_01.callChildLogicBlocksHotspot_map_pin_hastouch();
		me._map_01.callChildLogicBlocksHotspot_map_pin_activehotspotchanged();
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_01.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'web') {
				return;
			}
			me._map_01.ggMapId = mapId;
			if (!me._map_01.ggMapNotLoaded) {
				if (me._map_01.ggMap) {
					me._map_01.ggLastZoom = me._map_01.ggMap.getZoom();
				}
				me._map_01.ggClearMap();
				me._map_01.ggInitMap(true);
				me._map_01.ggInitMapMarkers(false);
				var mapDetails = player.getMapDetails(me._map_01.ggMapId);
				me._map_01.ggCalculateFloorplanDimInDeg(mapDetails);
				me._map_01.ggCheckBounds(mapDetails);
			}
		}
		me._map_01.ggCalculateFloorplanDimInDeg=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				me._map_01.mapWidthInDeg = tileInDeg * (tmpWidth / 256);
				me._map_01.mapHeightInDeg = me._map_01.mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				me._map_01.mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				me._map_01.mapWidthInDeg = me._map_01.mapHeightInDeg * mapAR;
			}
		}
		me._map_01.ggInCheckBounds=false;
		me._map_01.ggCheckBounds=function(mapDetails) {
			if (me._map_01.ggInCheckBounds) return;
			me._map_01.ggInCheckBounds = true;
			var mapCenter = me._map_01.ggMap.getCenter();
			var currentZoom = me._map_01.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_01.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_01.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng;
			var y = mapCenter.lat;
			var xTemp = x;
			var yTemp = y;
			if (me._map_01.mapWidthInDeg < me._map_01.clientWidth * pixelInDeg) {
				var xMargin = (me._map_01.clientWidth * pixelInDeg - me._map_01.mapWidthInDeg) / 2;
				if (x < me._map_01.mapWidthInDeg / 2 - xMargin) x = me._map_01.mapWidthInDeg / 2 - xMargin;
				if (x > me._map_01.mapWidthInDeg / 2 + xMargin) x = me._map_01.mapWidthInDeg / 2 + xMargin;
			} else {
				if (x > me._map_01.mapWidthInDeg - xOffset) x = me._map_01.mapWidthInDeg - xOffset;
				if (x < xOffset) x = xOffset;
			}
			if (me._map_01.mapHeightInDeg < me._map_01.clientHeight * pixelInDeg) {
				var yMargin = (me._map_01.clientHeight * pixelInDeg - me._map_01.mapHeightInDeg) / 2;
				if (y < -me._map_01.mapHeightInDeg / 2 - yMargin) y = -me._map_01.mapHeightInDeg / 2 - yMargin;
				if (y > -me._map_01.mapHeightInDeg / 2 + yMargin) y = -me._map_01.mapHeightInDeg / 2 + yMargin;
			} else {
				if (y < -me._map_01.mapHeightInDeg + yOffset) y = -me._map_01.mapHeightInDeg + yOffset;
				if (y > -yOffset) y = -yOffset;
			}
			if (x != xTemp || y != yTemp) {
				var newCenter = L.latLng(y, x);
				me._map_01.ggMap.setView(newCenter, me._map_01.ggMap.getZoom(), {animate: false});
			}
			me._map_01.ggInCheckBounds = false;
		}
		me._video_ytb.ggInitMedia('');
		me._video_1.ggVideoSource = 'media/';
		me._video_1.ggVideoNotLoaded = true;
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._cloner_next_area.ggUpdate();
			me._cloner_area.ggUpdate();
			me._map_01.ggClearMap();
			me._map_01.ggInitMap(false);
			me._map_01.ggInitMapMarkers(true);
			me._sel_floorplan_clone.ggUpdate();
			me._sel_area_clone.ggUpdate();
			me._cloner_thumb.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._scrollarea.ggUpdatePosition();
			me._sel_floorplan_scroll.ggUpdatePosition();
			me._sel_area_scroll.ggUpdatePosition();
			me._scrollarea_list_thumb.ggUpdatePosition();
			if (
				(
					((player.getVariableValue('var_intro') == true))
				)
			) {
				player.stopAutorotate();
			}
			me._timer_1.ggTimestamp=me.ggCurrentTime;
			me._timer_1.ggTimeout=1;
		});
		player.addListener('varchanged_show_menu_thumb', function() {me._cloner_thumb.ggText="pic";if (me._cloner_thumb.ggText=='') {	me._cloner_thumb.ggUpdate([]);} else {	me._cloner_thumb.ggUpdate(me._cloner_thumb.ggText.split(','));}skin.updateSize(skin.divSkin);me._tt_list_head.ggText="All";me._tt_list_head.ggTextDiv.innerHTML=me._tt_list_head.ggText;if (me._tt_list_head.ggUpdateText) {	me._tt_list_head.ggUpdateText=function() {		var hs="All";		if (hs!=this.ggText) {			this.ggText=hs;			this.ggTextDiv.innerHTML=hs;			if (this.ggUpdatePosition) this.ggUpdatePosition();		}	}}if (me._tt_list_head.ggUpdatePosition) {	me._tt_list_head.ggUpdatePosition();}me._tt_list_head.ggTextDiv.scrollTop = 0;});
		player.addListener('varchanged_sound_on', function() {if (	(		((player.getVariableValue('sound_on') == false))	)) {	player.setVolume("_main",0);}if (	(		((player.getVariableValue('sound_on') == true))	)) {	player.setVolume("_main",1);}});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
		me._tooltip_hs_con.onmouseover();
	}
	me.hotspotProxyOut=function(id, url) {
		me._tooltip_hs_con.onmouseout();
	}
	me.callChildLogicBlocksHotspot_callout_m_configloaded = function(){
		if(hotspotTemplates['callout_m']) {
			var i;
			for(i = 0; i < hotspotTemplates['callout_m'].length; i++) {
				if (hotspotTemplates['callout_m'][i]._callout_m.logicBlock_scaling) {
					hotspotTemplates['callout_m'][i]._callout_m.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_fun_changenode = function(){
		if(hotspotTemplates['ht_node_fun']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_fun'].length; i++) {
				if (hotspotTemplates['ht_node_fun'][i]._top_node_ring && hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_fun'][i]._bg_node_image && hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_fun_mouseover = function(){
		if(hotspotTemplates['ht_node_fun']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_fun'].length; i++) {
				if (hotspotTemplates['ht_node_fun'][i]._top_node_ring && hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_fun'][i]._bg_node_image && hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_fun'][i]._bg_node_image && hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_alpha) {
					hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_fun'][i]._bg_node_image && hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_scaling) {
					hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_fun'][i]._image_left && hotspotTemplates['ht_node_fun'][i]._image_left.logicBlock_position) {
					hotspotTemplates['ht_node_fun'][i]._image_left.logicBlock_position();
				}
				if (hotspotTemplates['ht_node_fun'][i]._image_right && hotspotTemplates['ht_node_fun'][i]._image_right.logicBlock_position) {
					hotspotTemplates['ht_node_fun'][i]._image_right.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_fun_varchanged_ht_colour = function(){
		if(hotspotTemplates['ht_node_fun']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_fun'].length; i++) {
				if (hotspotTemplates['ht_node_fun'][i]._top_node_ring && hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._top_node_ring.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_fun'][i]._bg_node_image && hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_fun'][i]._bg_node_image.logicBlock_bordercolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_arrow_changenode = function(){
		if(hotspotTemplates['ht_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_arrow'].length; i++) {
				if (hotspotTemplates['ht_arrow'][i]._custom_arrow && hotspotTemplates['ht_arrow'][i]._custom_arrow.logicBlock_externalurl) {
					hotspotTemplates['ht_arrow'][i]._custom_arrow.logicBlock_externalurl();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_arrow_configloaded = function(){
		if(hotspotTemplates['ht_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_arrow'].length; i++) {
				if (hotspotTemplates['ht_arrow'][i]._ht_arrow.logicBlock_scaling) {
					hotspotTemplates['ht_arrow'][i]._ht_arrow.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a && hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_alpha) {
					hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a && hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_position) {
					hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_arrow_mouseover = function(){
		if(hotspotTemplates['ht_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_arrow'].length; i++) {
				if (hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a && hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_alpha) {
					hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a && hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_position) {
					hotspotTemplates['ht_arrow'][i]._tt_ht_arrow_a.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_arrow_activehotspotchanged = function(){
		if(hotspotTemplates['ht_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_arrow'].length; i++) {
				if (hotspotTemplates['ht_arrow'][i]._custom_arrow && hotspotTemplates['ht_arrow'][i]._custom_arrow.logicBlock_externalurl) {
					hotspotTemplates['ht_arrow'][i]._custom_arrow.logicBlock_externalurl();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_c_changenode = function(){
		if(hotspotTemplates['ht_info_c']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_c'].length; i++) {
				if (hotspotTemplates['ht_info_c'][i]._rec_info_c && hotspotTemplates['ht_info_c'][i]._rec_info_c.logicBlock_size) {
					hotspotTemplates['ht_info_c'][i]._rec_info_c.logicBlock_size();
				}
				if (hotspotTemplates['ht_info_c'][i]._point_hs_info_c && hotspotTemplates['ht_info_c'][i]._point_hs_info_c.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_c'][i]._point_hs_info_c.logicBlock_backgroundcolor();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_visible) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_scaling) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_position) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_c'][i]._tt_info_c && hotspotTemplates['ht_info_c'][i]._tt_info_c.logicBlock_position) {
					hotspotTemplates['ht_info_c'][i]._tt_info_c.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_alpha) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_scaling) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_bordercolor) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_red_c && hotspotTemplates['ht_info_c'][i]._hs_red_c.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_c'][i]._hs_red_c.logicBlock_backgroundcolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_c_configloaded = function(){
		if(hotspotTemplates['ht_info_c']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_c'].length; i++) {
				if (hotspotTemplates['ht_info_c'][i]._ht_info_c.logicBlock_scaling) {
					hotspotTemplates['ht_info_c'][i]._ht_info_c.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_c_activehotspotchanged = function(){
		if(hotspotTemplates['ht_info_c']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_c'].length; i++) {
				if (hotspotTemplates['ht_info_c'][i]._rec_info_c && hotspotTemplates['ht_info_c'][i]._rec_info_c.logicBlock_size) {
					hotspotTemplates['ht_info_c'][i]._rec_info_c.logicBlock_size();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_visible) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_position) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_c'][i]._tt_info_c && hotspotTemplates['ht_info_c'][i]._tt_info_c.logicBlock_position) {
					hotspotTemplates['ht_info_c'][i]._tt_info_c.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_c_varchanged_var_hs = function(){
		if(hotspotTemplates['ht_info_c']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_c'].length; i++) {
				if (hotspotTemplates['ht_info_c'][i]._point_hs_info_c && hotspotTemplates['ht_info_c'][i]._point_hs_info_c.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_c'][i]._point_hs_info_c.logicBlock_backgroundcolor();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_image_c && hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_scaling) {
					hotspotTemplates['ht_info_c'][i]._hs_image_c.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_alpha) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_scaling) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_ring_c && hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_bordercolor) {
					hotspotTemplates['ht_info_c'][i]._hs_ring_c.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_info_c'][i]._hs_red_c && hotspotTemplates['ht_info_c'][i]._hs_red_c.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_c'][i]._hs_red_c.logicBlock_backgroundcolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_b_changenode = function(){
		if(hotspotTemplates['ht_info_b']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_b'].length; i++) {
				if (hotspotTemplates['ht_info_b'][i]._rec_info_b && hotspotTemplates['ht_info_b'][i]._rec_info_b.logicBlock_size) {
					hotspotTemplates['ht_info_b'][i]._rec_info_b.logicBlock_size();
				}
				if (hotspotTemplates['ht_info_b'][i]._point_hs_info && hotspotTemplates['ht_info_b'][i]._point_hs_info.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_b'][i]._point_hs_info.logicBlock_backgroundcolor();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_visible) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_scaling) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_position) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_b'][i]._tt_info_b && hotspotTemplates['ht_info_b'][i]._tt_info_b.logicBlock_position) {
					hotspotTemplates['ht_info_b'][i]._tt_info_b.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_alpha) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_scaling) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_bordercolor) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_red && hotspotTemplates['ht_info_b'][i]._hs_red.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_b'][i]._hs_red.logicBlock_backgroundcolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_b_configloaded = function(){
		if(hotspotTemplates['ht_info_b']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_b'].length; i++) {
				if (hotspotTemplates['ht_info_b'][i]._ht_info_b.logicBlock_scaling) {
					hotspotTemplates['ht_info_b'][i]._ht_info_b.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_b_activehotspotchanged = function(){
		if(hotspotTemplates['ht_info_b']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_b'].length; i++) {
				if (hotspotTemplates['ht_info_b'][i]._rec_info_b && hotspotTemplates['ht_info_b'][i]._rec_info_b.logicBlock_size) {
					hotspotTemplates['ht_info_b'][i]._rec_info_b.logicBlock_size();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_visible) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_position) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_position();
				}
				if (hotspotTemplates['ht_info_b'][i]._tt_info_b && hotspotTemplates['ht_info_b'][i]._tt_info_b.logicBlock_position) {
					hotspotTemplates['ht_info_b'][i]._tt_info_b.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_b_varchanged_var_hs = function(){
		if(hotspotTemplates['ht_info_b']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_b'].length; i++) {
				if (hotspotTemplates['ht_info_b'][i]._point_hs_info && hotspotTemplates['ht_info_b'][i]._point_hs_info.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_b'][i]._point_hs_info.logicBlock_backgroundcolor();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_image_b && hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_scaling) {
					hotspotTemplates['ht_info_b'][i]._hs_image_b.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_alpha) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_scaling) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_ring_b && hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_bordercolor) {
					hotspotTemplates['ht_info_b'][i]._hs_ring_b.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_info_b'][i]._hs_red && hotspotTemplates['ht_info_b'][i]._hs_red.logicBlock_backgroundcolor) {
					hotspotTemplates['ht_info_b'][i]._hs_red.logicBlock_backgroundcolor();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_changenode = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._hsimage_a && hotspotTemplates['ht_node_a'][i]._hsimage_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._hsimage_a.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a && hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_configloaded = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._ht_node_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._ht_node_a.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._tt_ht_node_a && hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._tt_ht_node_a && hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_position) {
					hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_mouseover = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a && hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a && hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._preview_nodeimage_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_logo_node && hotspotTemplates['ht_node_a'][i]._hs_logo_node.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._hs_logo_node.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_logo_node && hotspotTemplates['ht_node_a'][i]._hs_logo_node.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_logo_node.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_size) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_size();
				}
				if (hotspotTemplates['ht_node_a'][i]._tt_ht_node_a && hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._tt_ht_node_a && hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_position) {
					hotspotTemplates['ht_node_a'][i]._tt_ht_node_a.logicBlock_position();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_active = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a && hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_changevisitednodes = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a && hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._ht_checkmark_tick_a.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_activehotspotchanged = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._hsimage_a && hotspotTemplates['ht_node_a'][i]._hsimage_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._hsimage_a.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a && hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a.logicBlock_visible) {
					hotspotTemplates['ht_node_a'][i]._ht_node_customimage_a.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_a_varchanged_var_hs = function(){
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				if (hotspotTemplates['ht_node_a'][i]._hs_image_a && hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_image_a.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_alpha) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_bordercolor) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_bordercolor();
				}
				if (hotspotTemplates['ht_node_a'][i]._hs_ring_a && hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_scaling) {
					hotspotTemplates['ht_node_a'][i]._hs_ring_a.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_ring_configloaded = function(){
		if(hotspotTemplates['ht_ring']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_ring'].length; i++) {
				if (hotspotTemplates['ht_ring'][i]._ht_ring.logicBlock_scaling) {
					hotspotTemplates['ht_ring'][i]._ht_ring.logicBlock_scaling();
				}
				if (hotspotTemplates['ht_ring'][i]._tt_ht_ring_a && hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_position) {
					hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_position();
				}
				if (hotspotTemplates['ht_ring'][i]._tt_ht_ring_a && hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_alpha) {
					hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_ring_mouseover = function(){
		if(hotspotTemplates['ht_ring']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_ring'].length; i++) {
				if (hotspotTemplates['ht_ring'][i]._tt_ht_ring_a && hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_position) {
					hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_position();
				}
				if (hotspotTemplates['ht_ring'][i]._tt_ht_ring_a && hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_alpha) {
					hotspotTemplates['ht_ring'][i]._tt_ht_ring_a.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_ring_vrchanged = function(){
		if(hotspotTemplates['ht_ring']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_ring'].length; i++) {
				if (hotspotTemplates['ht_ring'][i]._ring && hotspotTemplates['ht_ring'][i]._ring.logicBlock_visible) {
					hotspotTemplates['ht_ring'][i]._ring.logicBlock_visible();
				}
				if (hotspotTemplates['ht_ring'][i]._pin_node_ico && hotspotTemplates['ht_ring'][i]._pin_node_ico.logicBlock_visible) {
					hotspotTemplates['ht_ring'][i]._pin_node_ico.logicBlock_visible();
				}
				if (hotspotTemplates['ht_ring'][i]._ex_ring && hotspotTemplates['ht_ring'][i]._ex_ring.logicBlock_visible) {
					hotspotTemplates['ht_ring'][i]._ex_ring.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me._hs_timer.ggLastIsActive!=me._hs_timer.ggIsActive()) {
			me._hs_timer.ggLastIsActive=me._hs_timer.ggIsActive();
			if (me._hs_timer.ggLastIsActive) {
				player.setVariableValue('var_hs', player.getVariableValue('var_hs') + Number("1"));
				player.setVariableValue('var_hs', player.getVariableValue('var_hs') % Number("4"));
			} else {
			}
		}
		if (me._timer_hs_fun.ggLastIsActive!=me._timer_hs_fun.ggIsActive()) {
			me._timer_hs_fun.ggLastIsActive=me._timer_hs_fun.ggIsActive();
			if (me._timer_hs_fun.ggLastIsActive) {
				player.setVariableValue('ht_colour', player.getVariableValue('ht_colour') + Number("1"));
				player.setVariableValue('ht_colour', player.getVariableValue('ht_colour') % Number("3"));
			} else {
			}
		}
		me._timer_hs_fun.ggUpdateConditionTimer();
		me._hide_timer_1.ggTimestamp=player.getLastActivity();
		me._hide_timer_1.ggUpdateConditionTimer();
		if (me._mouse_timer_1.ggLastIsActive!=me._mouse_timer_1.ggIsActive()) {
			me._mouse_timer_1.ggLastIsActive=me._mouse_timer_1.ggIsActive();
			if (me._mouse_timer_1.ggLastIsActive) {
				if (player.transitionsDisabled) {
					me._mouse_timer_1.style[domTransition]='none';
				} else {
					me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
				}
				me._mouse_timer_1.ggParameter.rx=4;me._mouse_timer_1.ggParameter.ry=-4;
				me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
				if (player.transitionsDisabled) {
					me._mouse_timer_1.style[domTransition]='none';
				} else {
					me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
				}
				me._mouse_timer_1.ggParameter.a="0.0000";
				me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
			} else {
				if (player.transitionsDisabled) {
					me._mouse_timer_1.style[domTransition]='none';
				} else {
					me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
				}
				me._mouse_timer_1.ggParameter.rx=-4;me._mouse_timer_1.ggParameter.ry=4;
				me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
				if (player.transitionsDisabled) {
					me._mouse_timer_1.style[domTransition]='none';
				} else {
					me._mouse_timer_1.style[domTransition]='all 1000ms ease-out 0ms';
				}
				me._mouse_timer_1.ggParameter.a="20.0000";
				me._mouse_timer_1.style[domTransform]=parameterToTransform(me._mouse_timer_1.ggParameter);
			}
		}
		me._map_01.ggUpdateConditionTimer();
		var hs='';
		if (me._container_tooltip.ggParameter) {
			hs+=parameterToTransform(me._container_tooltip.ggParameter) + ' ';
		}
		hs+='translate(0px,' + (1 * player.mouse.y + 0) + 'px) ';
		hs+='translate(' + (1 * player.mouse.x + 0) + 'px,0px) ';
		me._container_tooltip.style[domTransform]=hs;
		var hs='';
		if (me._tooltip_hs_con.ggParameter) {
			hs+=parameterToTransform(me._tooltip_hs_con.ggParameter) + ' ';
		}
		hs+='translate(' + (1 * player.mouse.x + 0) + 'px,0px) ';
		hs+='translate(0px,' + (1 * player.mouse.y + 0) + 'px) ';
		me._tooltip_hs_con.style[domTransform]=hs;
		if (me._timer_1.ggLastIsActive!=me._timer_1.ggIsActive()) {
			me._timer_1.ggLastIsActive=me._timer_1.ggIsActive();
			if (me._timer_1.ggLastIsActive) {
			} else {
				if (
					(
						((me.ggUserdata.tags.indexOf("img") != -1))
					)
				) {
						player.playSound("Element01","1");
				}
			}
		}
		me._timer_1.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_hs_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hs_info=document.createElement('div');
		el.ggId="hs_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 425px;';
		hs+='position : absolute;';
		hs+='top : 130px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._hs_info.onclick=function (e) {
			player.setVariableValue('hs_info', true);
			if (player.transitionsDisabled) {
				skin._container_info.style[domTransition]='none';
			} else {
				skin._container_info.style[domTransition]='all 500ms ease-out 0ms';
			}
			skin._container_info.ggParameter.sx=1;skin._container_info.ggParameter.sy=1;
			skin._container_info.style[domTransform]=parameterToTransform(skin._container_info.ggParameter);
			skin._text_info.ggText=me.hotspot.description;
			skin._text_info.ggTextDiv.innerHTML=skin._text_info.ggText;
			if (skin._text_info.ggUpdateText) {
				skin._text_info.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._text_info.ggUpdatePosition) {
				skin._text_info.ggUpdatePosition();
			}
			skin._text_info.ggTextDiv.scrollTop = 0;
			skin._info_image.ggText=basePath + me.hotspot.url;
			skin._info_image.ggSubElement.style.width = '0px';
			skin._info_image.ggSubElement.style.height = '0px';
			skin._info_image.ggSubElement.src='';
			skin._info_image.ggSubElement.src=skin._info_image.ggText;
			skin._text_title.ggText=me.hotspot.title;
			skin._text_title.ggTextDiv.innerHTML=skin._text_title.ggText;
			if (skin._text_title.ggUpdateText) {
				skin._text_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._text_title.ggUpdatePosition) {
				skin._text_title.ggUpdatePosition();
			}
			skin._text_title.ggTextDiv.scrollTop = 0;
			skin._video_1.ggInitMedia(me.hotspot.target);
				player.pauseSound("Element01");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hs_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hs_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hs_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hs_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._text_hs_info=document.createElement('div');
		els=me._text_hs_info__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text_hs_info";
		el.ggDx=0;
		el.ggDy=30;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 120px;';
		hs+='height: auto;';
		hs+='background: #434343;';
		hs+='background: rgba(67,67,67,0.705882);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		if (UI_text.english)
		{
			els.innerHTML = "Click here for details";
		} else
		{
			els.innerHTML = "Click v\xe0o \u0111\xe2y \u0111\u1ec3 xem chi ti\u1ebft thi\u1ebft b\u1ecb";
		}
		el.appendChild(els);
		me._text_hs_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_hs_info.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_info.appendChild(me._text_hs_info);
		el=me._icon_info=document.createElement('div');
		els=me._icon_info__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._icon_info.ggUpdatePosition();}
		el.ggText=basePath + "assets/icon/info.png";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="icon_info";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._icon_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._icon_info.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._icon_info.clientWidth;
			var parentHeight = me._icon_info.clientHeight;
			var img = me._icon_info__img;
			var aspectRatioDiv = me._icon_info.clientWidth / me._icon_info.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			} else {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._hs_info.appendChild(me._icon_info);
		me.__div = me._hs_info;
	};
	function SkinHotspotClass_callout_m(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._callout_m=document.createElement('div');
		el.ggId="callout_m";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 55px;';
		hs+='position : absolute;';
		hs+='top : 95px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._callout_m.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._callout_m.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._callout_m.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._callout_m.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._callout_m.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._callout_m.ggCurrentLogicStateScaling == 0) {
					me._callout_m.ggParameter.sx = 0.8;
					me._callout_m.ggParameter.sy = 0.8;
					me._callout_m.style[domTransform]=parameterToTransform(me._callout_m.ggParameter);
				}
				else {
					me._callout_m.ggParameter.sx = 1;
					me._callout_m.ggParameter.sy = 1;
					me._callout_m.style[domTransform]=parameterToTransform(me._callout_m.ggParameter);
				}
			}
		}
		me._callout_m.onclick=function (e) {
			if (
				(
					((me.hotspot.description != ""))
				)
			) {
				player.setVariableValue('callout_gallery', true);
			}
			if (
				(
					((me.hotspot.description != ""))
				)
			) {
				if (player.transitionsDisabled) {
					skin._container_callout.style[domTransition]='none';
				} else {
					skin._container_callout.style[domTransition]='all 500ms ease-out 0ms';
				}
				skin._container_callout.ggParameter.sx=1;skin._container_callout.ggParameter.sy=1;
				skin._container_callout.style[domTransform]=parameterToTransform(skin._container_callout.ggParameter);
			}
			skin._gallery_callout.ggText="<iframe src=\"assets\/gallery\/"+me.hotspot.description+"\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
			skin._gallery_callout.ggTextDiv.innerHTML=skin._gallery_callout.ggText;
			if (skin._gallery_callout.ggUpdateText) {
				skin._gallery_callout.ggUpdateText=function() {
					var hs="<iframe src=\"assets\/gallery\/"+me.hotspot.description+"\/index.html\" style=\"border:0px #ffffff none;\" name=\"gallery\" scrolling=\"no\" frameborder=\"0\" height=\"100%\" width=\"100%\" allowfullscreen><\/iframe>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._gallery_callout.ggUpdatePosition) {
				skin._gallery_callout.ggUpdatePosition();
			}
			skin._gallery_callout.ggTextDiv.scrollTop = 0;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._callout_m.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._callout_m.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._callout_m.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._callout_m.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_mask_m=document.createElement('div');
		el.ggId="ht_mask_m";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 15px;';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 109px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_mask_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_mask_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._tt_node_m=document.createElement('div');
		els=me._tt_node_m__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_node_m";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 104px;';
		hs+='height: auto;';
		hs+='background: #ffaa00;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 6px;';
		hs+=cssPrefix + 'border-radius: 6px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bolder;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title+"<br\/>";
		el.appendChild(els);
		me._tt_node_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_node_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_mask_m.appendChild(me._tt_node_m);
		me._callout_m.appendChild(me._ht_mask_m);
		el=me._ht_callout_m=document.createElement('div');
		el.ggId="ht_callout_m";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 15px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 2px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._ht_callout_m.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_callout_m.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._callout_m.appendChild(me._ht_callout_m);
		me.__div = me._callout_m;
	};
	function SkinHotspotClass_ht_node_fun(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node_fun=document.createElement('div');
		el.ggId="ht_node_fun";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 242px;';
		hs+='position : absolute;';
		hs+='top : 238px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_fun.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node_fun.onclick=function (e) {
			player.setVariableValue('ht_data_target', me.hotspot.target);
			var params = {
						   pan: me.hotspot.pan,
						   tilt: me.hotspot.tilt,
						   fov: 50,
						   projection: -1,
						   timingFunction: 1,
						   speed: 2
			};
			player.moveToEx(params);
			player.setVariableValue('ht_data_nodeid', me.hotspot.url);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_fun.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_fun.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node_fun']=true;
			me._top_node_ring.logicBlock_bordercolor();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_fun.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node_fun']=false;
			me._top_node_ring.logicBlock_bordercolor();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_fun.ontouchend=function (e) {
			me.elementMouseOver['ht_node_fun']=false;
			me._top_node_ring.logicBlock_bordercolor();
		}
		me._ht_node_fun.ggUpdatePosition=function (useTransition) {
		}
		el=me._top_node_ring=document.createElement('div');
		el.ggId="top_node_ring";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 3px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		hs+='animation: pulse 2s infinite ease-out;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._top_node_ring.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._top_node_ring.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['ht_node_fun'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((player.getVariableValue('ht_colour') == 0))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.getVariableValue('ht_colour') == 1))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else if (
				((player.getVariableValue('ht_colour') == 2))
			)
			{
				newLogicStateBorderColor = 3;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._top_node_ring.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._top_node_ring.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._top_node_ring.style[domTransition]='border-color 700ms ease 0ms';
				if (me._top_node_ring.ggCurrentLogicStateBorderColor == 0) {
					me._top_node_ring.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._top_node_ring.ggCurrentLogicStateBorderColor == 1) {
					me._top_node_ring.style.borderColor="rgba(255,0,0,1)";
				}
				else if (me._top_node_ring.ggCurrentLogicStateBorderColor == 2) {
					me._top_node_ring.style.borderColor="rgba(255,255,0,1)";
				}
				else if (me._top_node_ring.ggCurrentLogicStateBorderColor == 3) {
					me._top_node_ring.style.borderColor="rgba(0,255,127,1)";
				}
				else {
					me._top_node_ring.style.borderColor="rgba(255,255,255,1)";
				}
			}
		}
		me._top_node_ring.onmouseover=function (e) {
			me.elementMouseOver['top_node_ring']=true;
			me._bg_node_image.logicBlock_bordercolor();
			me._bg_node_image.logicBlock_alpha();
			me._bg_node_image.logicBlock_scaling();
		}
		me._top_node_ring.onmouseout=function (e) {
			me.elementMouseOver['top_node_ring']=false;
			me._bg_node_image.logicBlock_bordercolor();
			me._bg_node_image.logicBlock_alpha();
			me._bg_node_image.logicBlock_scaling();
		}
		me._top_node_ring.ontouchend=function (e) {
			me.elementMouseOver['top_node_ring']=false;
			me._bg_node_image.logicBlock_bordercolor();
			me._bg_node_image.logicBlock_alpha();
			me._bg_node_image.logicBlock_scaling();
		}
		me._top_node_ring.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._bg_node_image=document.createElement('div');
		el.ggId="bg_node_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.3,sy:0.3 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 4px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='animation: pulse 2s infinite ease-out;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._bg_node_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._bg_node_image.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['top_node_ring'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._bg_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._bg_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._bg_node_image.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms, opacity 0s, border-color 700ms ease 0ms';
				if (me._bg_node_image.ggCurrentLogicStateScaling == 0) {
					me._bg_node_image.ggParameter.sx = 1;
					me._bg_node_image.ggParameter.sy = 1;
					me._bg_node_image.style[domTransform]=parameterToTransform(me._bg_node_image.ggParameter);
				}
				else {
					me._bg_node_image.ggParameter.sx = 0.3;
					me._bg_node_image.ggParameter.sy = 0.3;
					me._bg_node_image.style[domTransform]=parameterToTransform(me._bg_node_image.ggParameter);
				}
			}
		}
		me._bg_node_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['top_node_ring'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._bg_node_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._bg_node_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._bg_node_image.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms, opacity 0s, border-color 700ms ease 0ms';
				if (me._bg_node_image.ggCurrentLogicStateAlpha == 0) {
					me._bg_node_image.style.visibility=me._bg_node_image.ggVisible?'inherit':'hidden';
					me._bg_node_image.style.opacity=1;
				}
				else {
					me._bg_node_image.style.visibility="hidden";
					me._bg_node_image.style.opacity=0;
				}
			}
		}
		me._bg_node_image.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['top_node_ring'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((player.getVariableValue('ht_colour') == 0))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.getVariableValue('ht_colour') == 1))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else if (
				((player.getVariableValue('ht_colour') == 2))
			)
			{
				newLogicStateBorderColor = 3;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._bg_node_image.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._bg_node_image.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._bg_node_image.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms, opacity 0s, border-color 700ms ease 0ms';
				if (me._bg_node_image.ggCurrentLogicStateBorderColor == 0) {
					me._bg_node_image.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._bg_node_image.ggCurrentLogicStateBorderColor == 1) {
					me._bg_node_image.style.borderColor="rgba(255,0,0,1)";
				}
				else if (me._bg_node_image.ggCurrentLogicStateBorderColor == 2) {
					me._bg_node_image.style.borderColor="rgba(255,255,0,1)";
				}
				else if (me._bg_node_image.ggCurrentLogicStateBorderColor == 3) {
					me._bg_node_image.style.borderColor="rgba(0,255,127,1)";
				}
				else {
					me._bg_node_image.style.borderColor="rgba(255,255,255,1)";
				}
			}
		}
		me._bg_node_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._mask_hs_fun=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="mask_hs_fun";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='border-radius: 999px;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._mask_hs_fun.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._mask_hs_fun.onmouseover=function (e) {
			me.elementMouseOver['mask_hs_fun']=true;
			me._image_left.logicBlock_position();
			me._image_right.logicBlock_position();
		}
		me._mask_hs_fun.onmouseout=function (e) {
			me.elementMouseOver['mask_hs_fun']=false;
			me._image_left.logicBlock_position();
			me._image_right.logicBlock_position();
		}
		me._mask_hs_fun.ontouchend=function (e) {
			me.elementMouseOver['mask_hs_fun']=false;
			me._image_left.logicBlock_position();
			me._image_right.logicBlock_position();
		}
		me._mask_hs_fun.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._image_left=document.createElement('div');
		els=me._image_left__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/image_left_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="image_left";
		el.ggDx=-100;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_left.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._image_left.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.elementMouseOver['mask_hs_fun'] == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._image_left.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._image_left.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._image_left.style[domTransition]='left 700ms ease 0ms, top 700ms ease 0ms';
				if (me._image_left.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = 0;
					me._image_left.ggUpdatePosition(true);
				}
				else {
					me._image_left.ggDx=-100;
					me._image_left.ggDy=0;
					me._image_left.ggUpdatePosition(true);
				}
			}
		}
		me._image_left.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._mask_hs_fun.appendChild(me._image_left);
		el=me._image_right=document.createElement('div');
		els=me._image_right__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/image_right_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="image_right";
		el.ggDx=100;
		el.ggDy=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_right.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._image_right.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.elementMouseOver['mask_hs_fun'] == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._image_right.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._image_right.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._image_right.style[domTransition]='left 700ms ease 0ms, top 700ms ease 0ms';
				if (me._image_right.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = 0;
					me._image_right.ggUpdatePosition(true);
				}
				else {
					me._image_right.ggDx=100;
					me._image_right.ggDy=2;
					me._image_right.ggUpdatePosition(true);
				}
			}
		}
		me._image_right.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._mask_hs_fun.appendChild(me._image_right);
		me._bg_node_image.appendChild(me._mask_hs_fun);
		me._top_node_ring.appendChild(me._bg_node_image);
		me._ht_node_fun.appendChild(me._top_node_ring);
		me.__div = me._ht_node_fun;
	};
	function SkinHotspotClass_ht_arrow(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_arrow=document.createElement('div');
		el.ggId="ht_arrow";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 256px;';
		hs+='position : absolute;';
		hs+='top : 415px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_arrow.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_arrow.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_arrow.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_arrow.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_arrow.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_arrow.ggCurrentLogicStateScaling == 0) {
					me._ht_arrow.ggParameter.sx = 0.8;
					me._ht_arrow.ggParameter.sy = 0.8;
					me._ht_arrow.style[domTransform]=parameterToTransform(me._ht_arrow.ggParameter);
				}
				else {
					me._ht_arrow.ggParameter.sx = 1;
					me._ht_arrow.ggParameter.sy = 1;
					me._ht_arrow.style[domTransform]=parameterToTransform(me._ht_arrow.ggParameter);
				}
			}
		}
		me._ht_arrow.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_arrow.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_arrow.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_arrow']=true;
			me._tt_ht_arrow_a.logicBlock_alpha();
			me._tt_ht_arrow_a.logicBlock_position();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_arrow.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_arrow']=false;
			me._tt_ht_arrow_a.logicBlock_alpha();
			me._tt_ht_arrow_a.logicBlock_position();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_arrow.ontouchend=function (e) {
			me.elementMouseOver['ht_arrow']=false;
			me._tt_ht_arrow_a.logicBlock_alpha();
			me._tt_ht_arrow_a.logicBlock_position();
		}
		me._ht_arrow.ggUpdatePosition=function (useTransition) {
		}
		el=me._custom_arrow=document.createElement('div');
		els=me._custom_arrow__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._custom_arrow.ggUpdatePosition();}
		el.ggText=basePath + "assets/icon/arrow.png";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="custom_arrow";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._custom_arrow.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._custom_arrow.logicBlock_externalurl = function() {
			var newLogicStateExternalUrl;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateExternalUrl = 0;
			}
			else {
				newLogicStateExternalUrl = -1;
			}
			if (me._custom_arrow.ggCurrentLogicStateExternalUrl != newLogicStateExternalUrl) {
				me._custom_arrow.ggCurrentLogicStateExternalUrl = newLogicStateExternalUrl;
				me._custom_arrow.style[domTransition]='';
				if (me._custom_arrow.ggCurrentLogicStateExternalUrl == 0) {
					me._custom_arrow.ggText=basePath + "assets/door.png";
					me._custom_arrow__img.style.width = '0px';
					me._custom_arrow__img.style.height = '0px';
					me._custom_arrow__img.src=me._custom_arrow.ggText;
				}
				else {
					me._custom_arrow.ggText=basePath + "assets/icon/arrow.png";
					me._custom_arrow__img.style.width = '0px';
					me._custom_arrow__img.style.height = '0px';
					me._custom_arrow__img.src=me._custom_arrow.ggText;
				}
			}
		}
		me._custom_arrow.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._custom_arrow.clientWidth;
			var parentHeight = me._custom_arrow.clientHeight;
			var img = me._custom_arrow__img;
			var aspectRatioDiv = me._custom_arrow.clientWidth / me._custom_arrow.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_arrow.appendChild(me._custom_arrow);
		el=me._tt_ht_arrow_a=document.createElement('div');
		els=me._tt_ht_arrow_a__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_arrow_a";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 22px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 160px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #253d8f;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 6px;';
		hs+=cssPrefix + 'border-radius: 6px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 6px 7px 6px 7px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_arrow_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_arrow_a.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.elementMouseOver['ht_arrow'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_arrow_a.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_arrow_a.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_arrow_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_arrow_a.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_arrow_a.style.bottom='45px';
					me._tt_ht_arrow_a.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_arrow_a.ggDx=0;
					me._tt_ht_arrow_a.style.bottom='22px';
					me._tt_ht_arrow_a.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_arrow_a.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true)) || 
				((me.elementMouseOver['ht_arrow'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._tt_ht_arrow_a.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._tt_ht_arrow_a.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._tt_ht_arrow_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_arrow_a.ggCurrentLogicStateAlpha == 0) {
					me._tt_ht_arrow_a.style.visibility=me._tt_ht_arrow_a.ggVisible?'inherit':'hidden';
					me._tt_ht_arrow_a.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._tt_ht_arrow_a.style.opacity == 0.0) { me._tt_ht_arrow_a.style.visibility="hidden"; } }, 505);
					me._tt_ht_arrow_a.style.opacity=0;
				}
			}
		}
		me._tt_ht_arrow_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((166-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_arrow.appendChild(me._tt_ht_arrow_a);
		me.__div = me._ht_arrow;
	};
	function SkinHotspotClass_ht_info_c(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_c=document.createElement('div');
		el.ggId="ht_info_c";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 72px;';
		hs+='position : absolute;';
		hs+='top : 165px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._ht_info_c.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_c.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_c.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_c.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_info_c.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_info_c.ggCurrentLogicStateScaling == 0) {
					me._ht_info_c.ggParameter.sx = 0.8;
					me._ht_info_c.ggParameter.sy = 0.8;
					me._ht_info_c.style[domTransform]=parameterToTransform(me._ht_info_c.ggParameter);
				}
				else {
					me._ht_info_c.ggParameter.sx = 1;
					me._ht_info_c.ggParameter.sy = 1;
					me._ht_info_c.style[domTransform]=parameterToTransform(me._ht_info_c.ggParameter);
				}
			}
		}
		me._ht_info_c.onclick=function (e) {
			player.setVariableValue('hs_info_c', true);
			if (player.transitionsDisabled) {
				skin._container_info_c.style[domTransition]='none';
			} else {
				skin._container_info_c.style[domTransition]='all 700ms ease-out 0ms';
			}
			skin._container_info_c.ggParameter.sx=1;skin._container_info_c.ggParameter.sy=1;
			skin._container_info_c.style[domTransform]=parameterToTransform(skin._container_info_c.ggParameter);
			skin._info_image_c.ggText=basePath + me.hotspot.url;
			skin._info_image_c.ggSubElement.style.width = '0px';
			skin._info_image_c.ggSubElement.style.height = '0px';
			skin._info_image_c.ggSubElement.src='';
			skin._info_image_c.ggSubElement.src=skin._info_image_c.ggText;
			skin._text_info_c.ggText=me.hotspot.description;
			skin._text_info_c.ggTextDiv.innerHTML=skin._text_info_c.ggText;
			if (skin._text_info_c.ggUpdateText) {
				skin._text_info_c.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._text_info_c.ggUpdatePosition) {
				skin._text_info_c.ggUpdatePosition();
			}
			skin._text_info_c.ggTextDiv.scrollTop = 0;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_c.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_c.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_c.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_c.ggUpdatePosition=function (useTransition) {
		}
		el=me._rec_info_c=document.createElement('div');
		el.ggId="Rec_info_c";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 2px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rec_info_c.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.hotspot.target == "1"))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((me.hotspot.target == "2"))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((me.hotspot.target == "3"))
			)
			{
				newLogicStateSize = 2;
			}
			else if (
				((me.hotspot.target == "4"))
			)
			{
				newLogicStateSize = 3;
			}
			else if (
				((me.hotspot.target == "5"))
			)
			{
				newLogicStateSize = 4;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._rec_info_c.ggCurrentLogicStateSize != newLogicStateSize) {
				me._rec_info_c.ggCurrentLogicStateSize = newLogicStateSize;
				me._rec_info_c.style[domTransition]='width 0s, height 0s';
				if (me._rec_info_c.ggCurrentLogicStateSize == 0) {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='30px';
					skin.updateSize(me._rec_info_c);
				}
				else if (me._rec_info_c.ggCurrentLogicStateSize == 1) {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='60px';
					skin.updateSize(me._rec_info_c);
				}
				else if (me._rec_info_c.ggCurrentLogicStateSize == 2) {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='90px';
					skin.updateSize(me._rec_info_c);
				}
				else if (me._rec_info_c.ggCurrentLogicStateSize == 3) {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='120px';
					skin.updateSize(me._rec_info_c);
				}
				else if (me._rec_info_c.ggCurrentLogicStateSize == 4) {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='140px';
					skin.updateSize(me._rec_info_c);
				}
				else {
					me._rec_info_c.style.width='2px';
					me._rec_info_c.style.height='90px';
					skin.updateSize(me._rec_info_c);
				}
			}
		}
		me._rec_info_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_info_c.appendChild(me._rec_info_c);
		el=me._point_hs_info_c=document.createElement('div');
		el.ggId="point_hs_info_c";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 12px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point_hs_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._point_hs_info_c.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._point_hs_info_c.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._point_hs_info_c.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._point_hs_info_c.style[domTransition]='background-color 500ms ease 0ms';
				if (me._point_hs_info_c.ggCurrentLogicStateBackgroundColor == 0) {
					me._point_hs_info_c.style.backgroundColor="rgba(19,97,84,1)";
				}
				else {
					me._point_hs_info_c.style.backgroundColor="rgba(255,255,255,1)";
				}
			}
		}
		me._point_hs_info_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info_c.appendChild(me._point_hs_info_c);
		el=me._hs_image_c=document.createElement('div');
		el.ggId="hs_image_c";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 2px solid #ffffff;';
		hs+='bottom : 90px;';
		hs+='cursor : pointer;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 16px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_image_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_image_c.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.hotspot.target == "1"))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((me.hotspot.target == "2"))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((me.hotspot.target == "3"))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((me.hotspot.target == "4"))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((me.hotspot.target == "5"))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._hs_image_c.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._hs_image_c.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._hs_image_c.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_c.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._hs_image_c.style.bottom='30px';
					me._hs_image_c.ggUpdatePosition(true);
				}
				else if (me._hs_image_c.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					me._hs_image_c.style.bottom='60px';
					me._hs_image_c.ggUpdatePosition(true);
				}
				else if (me._hs_image_c.ggCurrentLogicStatePosition == 2) {
					this.ggDx = 0;
					me._hs_image_c.style.bottom='90px';
					me._hs_image_c.ggUpdatePosition(true);
				}
				else if (me._hs_image_c.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					me._hs_image_c.style.bottom='120px';
					me._hs_image_c.ggUpdatePosition(true);
				}
				else if (me._hs_image_c.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 0;
					me._hs_image_c.style.bottom='140px';
					me._hs_image_c.ggUpdatePosition(true);
				}
				else {
					me._hs_image_c.ggDx=0;
					me._hs_image_c.style.bottom='90px';
					me._hs_image_c.ggUpdatePosition(true);
				}
			}
		}
		me._hs_image_c.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_image_c.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_image_c.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_image_c.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_c.ggCurrentLogicStateScaling == 0) {
					me._hs_image_c.ggParameter.sx = 0.8;
					me._hs_image_c.ggParameter.sy = 0.8;
					me._hs_image_c.style[domTransform]=parameterToTransform(me._hs_image_c.ggParameter);
				}
				else {
					me._hs_image_c.ggParameter.sx = 1;
					me._hs_image_c.ggParameter.sy = 1;
					me._hs_image_c.style[domTransform]=parameterToTransform(me._hs_image_c.ggParameter);
				}
			}
		}
		me._hs_image_c.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_image_c.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_image_c.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_image_c.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_c.ggCurrentLogicStateVisible == 0) {
					me._hs_image_c.style.visibility="hidden";
					me._hs_image_c.ggVisible=false;
				}
				else {
					me._hs_image_c.style.visibility="hidden";
					me._hs_image_c.ggVisible=false;
				}
			}
		}
		me._hs_image_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hs_ring_c=document.createElement('div');
		el.ggId="hs_ring_c";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 1px solid #16365d;';
		hs+='cursor : pointer;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 16px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_ring_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_ring_c.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_hs') == 2))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_ring_c.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_ring_c.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_ring_c.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_c.ggCurrentLogicStateScaling == 0) {
					me._hs_ring_c.ggParameter.sx = 9;
					me._hs_ring_c.ggParameter.sy = 9;
					me._hs_ring_c.style[domTransform]=parameterToTransform(me._hs_ring_c.ggParameter);
				}
				else {
					me._hs_ring_c.ggParameter.sx = 1;
					me._hs_ring_c.ggParameter.sy = 1;
					me._hs_ring_c.style[domTransform]=parameterToTransform(me._hs_ring_c.ggParameter);
				}
			}
		}
		me._hs_ring_c.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_ring_c.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_ring_c.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_ring_c.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_c.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._hs_ring_c.style.opacity == 0.0) { me._hs_ring_c.style.visibility="hidden"; } }, 505);
					me._hs_ring_c.style.opacity=0;
				}
				else {
					me._hs_ring_c.style.visibility=me._hs_ring_c.ggVisible?'inherit':'hidden';
					me._hs_ring_c.style.opacity=1;
				}
			}
		}
		me._hs_ring_c.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('var_hs') == 0)) || 
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._hs_ring_c.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._hs_ring_c.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._hs_ring_c.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_c.ggCurrentLogicStateBorderColor == 0) {
					me._hs_ring_c.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._hs_ring_c.style.borderColor="rgba(22,54,93,1)";
				}
			}
		}
		me._hs_ring_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_image_c.appendChild(me._hs_ring_c);
		el=me._hs_red_c=document.createElement('div');
		el.ggId="hs_RED_c";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 12px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_red_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_red_c.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._hs_red_c.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._hs_red_c.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._hs_red_c.style[domTransition]='background-color 500ms ease 0ms';
				if (me._hs_red_c.ggCurrentLogicStateBackgroundColor == 0) {
					me._hs_red_c.style.backgroundColor="rgba(22,54,93,1)";
				}
				else {
					me._hs_red_c.style.backgroundColor="rgba(255,255,255,1)";
				}
			}
		}
		me._hs_red_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_image_c.appendChild(me._hs_red_c);
		me._ht_info_c.appendChild(me._hs_image_c);
		el=me._tt_info_c=document.createElement('div');
		els=me._tt_info_c__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info_c";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 113px;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #057090;';
		hs+='border: 2px solid #be8117;';
		hs+='border-radius: 12px;';
		hs+=cssPrefix + 'border-radius: 12px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 8px 9px 8px 9px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_info_c.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_info_c.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.hotspot.target == "1"))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((me.hotspot.target == "2"))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((me.hotspot.target == "3"))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((me.hotspot.target == "4"))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((me.hotspot.target == "5"))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_info_c.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_info_c.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_info_c.style[domTransition]='left 0s, bottom 0s';
				if (me._tt_info_c.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_info_c.style.bottom='37px';
					me._tt_info_c.ggUpdatePosition(true);
				}
				else if (me._tt_info_c.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					me._tt_info_c.style.bottom='67px';
					me._tt_info_c.ggUpdatePosition(true);
				}
				else if (me._tt_info_c.ggCurrentLogicStatePosition == 2) {
					this.ggDx = 0;
					me._tt_info_c.style.bottom='97px';
					me._tt_info_c.ggUpdatePosition(true);
				}
				else if (me._tt_info_c.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					me._tt_info_c.style.bottom='127px';
					me._tt_info_c.ggUpdatePosition(true);
				}
				else if (me._tt_info_c.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 0;
					me._tt_info_c.style.bottom='147px';
					me._tt_info_c.ggUpdatePosition(true);
				}
				else {
					me._tt_info_c.ggDx=0;
					me._tt_info_c.style.bottom='113px';
					me._tt_info_c.ggUpdatePosition(true);
				}
			}
		}
		me._tt_info_c.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((146-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_c.appendChild(me._tt_info_c);
		me.__div = me._ht_info_c;
	};
	function SkinHotspotClass_ht_info_b(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info_b=document.createElement('div');
		el.ggId="ht_info_b";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 72px;';
		hs+='position : absolute;';
		hs+='top : 165px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._ht_info_b.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info_b.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_b.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_b.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_info_b.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_info_b.ggCurrentLogicStateScaling == 0) {
					me._ht_info_b.ggParameter.sx = 0.8;
					me._ht_info_b.ggParameter.sy = 0.8;
					me._ht_info_b.style[domTransform]=parameterToTransform(me._ht_info_b.ggParameter);
				}
				else {
					me._ht_info_b.ggParameter.sx = 1;
					me._ht_info_b.ggParameter.sy = 1;
					me._ht_info_b.style[domTransform]=parameterToTransform(me._ht_info_b.ggParameter);
				}
			}
		}
		me._ht_info_b.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_b.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_b.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_b.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info_b.ggUpdatePosition=function (useTransition) {
		}
		el=me._rec_info_b=document.createElement('div');
		el.ggId="Rec_info_b";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 2px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_info_b.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._rec_info_b.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.hotspot.description == "1"))
			)
			{
				newLogicStateSize = 0;
			}
			else if (
				((me.hotspot.description == "2"))
			)
			{
				newLogicStateSize = 1;
			}
			else if (
				((me.hotspot.description == "3"))
			)
			{
				newLogicStateSize = 2;
			}
			else if (
				((me.hotspot.description == "4"))
			)
			{
				newLogicStateSize = 3;
			}
			else if (
				((me.hotspot.description == "5"))
			)
			{
				newLogicStateSize = 4;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._rec_info_b.ggCurrentLogicStateSize != newLogicStateSize) {
				me._rec_info_b.ggCurrentLogicStateSize = newLogicStateSize;
				me._rec_info_b.style[domTransition]='width 0s, height 0s';
				if (me._rec_info_b.ggCurrentLogicStateSize == 0) {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='30px';
					skin.updateSize(me._rec_info_b);
				}
				else if (me._rec_info_b.ggCurrentLogicStateSize == 1) {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='60px';
					skin.updateSize(me._rec_info_b);
				}
				else if (me._rec_info_b.ggCurrentLogicStateSize == 2) {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='90px';
					skin.updateSize(me._rec_info_b);
				}
				else if (me._rec_info_b.ggCurrentLogicStateSize == 3) {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='120px';
					skin.updateSize(me._rec_info_b);
				}
				else if (me._rec_info_b.ggCurrentLogicStateSize == 4) {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='140px';
					skin.updateSize(me._rec_info_b);
				}
				else {
					me._rec_info_b.style.width='2px';
					me._rec_info_b.style.height='90px';
					skin.updateSize(me._rec_info_b);
				}
			}
		}
		me._rec_info_b.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_info_b.appendChild(me._rec_info_b);
		el=me._point_hs_info=document.createElement('div');
		el.ggId="point_hs_info";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 12px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point_hs_info.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._point_hs_info.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._point_hs_info.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._point_hs_info.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._point_hs_info.style[domTransition]='background-color 500ms ease 0ms';
				if (me._point_hs_info.ggCurrentLogicStateBackgroundColor == 0) {
					me._point_hs_info.style.backgroundColor="rgba(19,97,84,1)";
				}
				else {
					me._point_hs_info.style.backgroundColor="rgba(255,255,255,1)";
				}
			}
		}
		me._point_hs_info.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_info_b.appendChild(me._point_hs_info);
		el=me._hs_image_b=document.createElement('div');
		el.ggId="hs_image_b";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 2px solid #ffffff;';
		hs+='bottom : 90px;';
		hs+='cursor : pointer;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 16px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_image_b.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_image_b.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.hotspot.description == "1"))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((me.hotspot.description == "2"))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((me.hotspot.description == "3"))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((me.hotspot.description == "4"))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((me.hotspot.description == "5"))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._hs_image_b.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._hs_image_b.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._hs_image_b.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_b.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._hs_image_b.style.bottom='30px';
					me._hs_image_b.ggUpdatePosition(true);
				}
				else if (me._hs_image_b.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					me._hs_image_b.style.bottom='60px';
					me._hs_image_b.ggUpdatePosition(true);
				}
				else if (me._hs_image_b.ggCurrentLogicStatePosition == 2) {
					this.ggDx = 0;
					me._hs_image_b.style.bottom='90px';
					me._hs_image_b.ggUpdatePosition(true);
				}
				else if (me._hs_image_b.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					me._hs_image_b.style.bottom='120px';
					me._hs_image_b.ggUpdatePosition(true);
				}
				else if (me._hs_image_b.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 0;
					me._hs_image_b.style.bottom='140px';
					me._hs_image_b.ggUpdatePosition(true);
				}
				else {
					me._hs_image_b.ggDx=0;
					me._hs_image_b.style.bottom='90px';
					me._hs_image_b.ggUpdatePosition(true);
				}
			}
		}
		me._hs_image_b.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_image_b.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_image_b.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_image_b.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_b.ggCurrentLogicStateScaling == 0) {
					me._hs_image_b.ggParameter.sx = 0.8;
					me._hs_image_b.ggParameter.sy = 0.8;
					me._hs_image_b.style[domTransform]=parameterToTransform(me._hs_image_b.ggParameter);
				}
				else {
					me._hs_image_b.ggParameter.sx = 1;
					me._hs_image_b.ggParameter.sy = 1;
					me._hs_image_b.style[domTransform]=parameterToTransform(me._hs_image_b.ggParameter);
				}
			}
		}
		me._hs_image_b.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_image_b.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_image_b.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_image_b.style[domTransition]='left 0s, bottom 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_b.ggCurrentLogicStateVisible == 0) {
					me._hs_image_b.style.visibility="hidden";
					me._hs_image_b.ggVisible=false;
				}
				else {
					me._hs_image_b.style.visibility="hidden";
					me._hs_image_b.ggVisible=false;
				}
			}
		}
		me._hs_image_b.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hs_ring_b=document.createElement('div');
		el.ggId="hs_ring_b";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 1px solid #16365d;';
		hs+='cursor : pointer;';
		hs+='height : 16px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 16px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_ring_b.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_ring_b.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_hs') == 2))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_ring_b.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_ring_b.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_ring_b.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_b.ggCurrentLogicStateScaling == 0) {
					me._hs_ring_b.ggParameter.sx = 9;
					me._hs_ring_b.ggParameter.sy = 9;
					me._hs_ring_b.style[domTransform]=parameterToTransform(me._hs_ring_b.ggParameter);
				}
				else {
					me._hs_ring_b.ggParameter.sx = 1;
					me._hs_ring_b.ggParameter.sy = 1;
					me._hs_ring_b.style[domTransform]=parameterToTransform(me._hs_ring_b.ggParameter);
				}
			}
		}
		me._hs_ring_b.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_ring_b.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_ring_b.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_ring_b.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_b.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._hs_ring_b.style.opacity == 0.0) { me._hs_ring_b.style.visibility="hidden"; } }, 505);
					me._hs_ring_b.style.opacity=0;
				}
				else {
					me._hs_ring_b.style.visibility=me._hs_ring_b.ggVisible?'inherit':'hidden';
					me._hs_ring_b.style.opacity=1;
				}
			}
		}
		me._hs_ring_b.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('var_hs') == 0)) || 
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._hs_ring_b.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._hs_ring_b.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._hs_ring_b.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_b.ggCurrentLogicStateBorderColor == 0) {
					me._hs_ring_b.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._hs_ring_b.style.borderColor="rgba(22,54,93,1)";
				}
			}
		}
		me._hs_ring_b.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_image_b.appendChild(me._hs_ring_b);
		el=me._hs_red=document.createElement('div');
		el.ggId="hs_RED";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 12px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_red.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_red.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._hs_red.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._hs_red.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._hs_red.style[domTransition]='background-color 500ms ease 0ms';
				if (me._hs_red.ggCurrentLogicStateBackgroundColor == 0) {
					me._hs_red.style.backgroundColor="rgba(22,54,93,1)";
				}
				else {
					me._hs_red.style.backgroundColor="rgba(255,255,255,1)";
				}
			}
		}
		me._hs_red.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_image_b.appendChild(me._hs_red);
		me._ht_info_b.appendChild(me._hs_image_b);
		el=me._tt_info_b=document.createElement('div');
		els=me._tt_info_b__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_info_b";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 113px;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #057090;';
		hs+='border: 2px solid #be8117;';
		hs+='border-radius: 12px;';
		hs+=cssPrefix + 'border-radius: 12px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 8px 9px 8px 9px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_info_b.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_info_b.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.hotspot.description == "1"))
			)
			{
				newLogicStatePosition = 0;
			}
			else if (
				((me.hotspot.description == "2"))
			)
			{
				newLogicStatePosition = 1;
			}
			else if (
				((me.hotspot.description == "3"))
			)
			{
				newLogicStatePosition = 2;
			}
			else if (
				((me.hotspot.description == "4"))
			)
			{
				newLogicStatePosition = 3;
			}
			else if (
				((me.hotspot.description == "5"))
			)
			{
				newLogicStatePosition = 4;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_info_b.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_info_b.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_info_b.style[domTransition]='left 0s, bottom 0s';
				if (me._tt_info_b.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_info_b.style.bottom='37px';
					me._tt_info_b.ggUpdatePosition(true);
				}
				else if (me._tt_info_b.ggCurrentLogicStatePosition == 1) {
					this.ggDx = 0;
					me._tt_info_b.style.bottom='67px';
					me._tt_info_b.ggUpdatePosition(true);
				}
				else if (me._tt_info_b.ggCurrentLogicStatePosition == 2) {
					this.ggDx = 0;
					me._tt_info_b.style.bottom='97px';
					me._tt_info_b.ggUpdatePosition(true);
				}
				else if (me._tt_info_b.ggCurrentLogicStatePosition == 3) {
					this.ggDx = 0;
					me._tt_info_b.style.bottom='127px';
					me._tt_info_b.ggUpdatePosition(true);
				}
				else if (me._tt_info_b.ggCurrentLogicStatePosition == 4) {
					this.ggDx = 0;
					me._tt_info_b.style.bottom='147px';
					me._tt_info_b.ggUpdatePosition(true);
				}
				else {
					me._tt_info_b.ggDx=0;
					me._tt_info_b.style.bottom='113px';
					me._tt_info_b.ggUpdatePosition(true);
				}
			}
		}
		me._tt_info_b.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((146-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info_b.appendChild(me._tt_info_b);
		me.__div = me._ht_info_b;
	};
	function SkinHotspotClass_ht_node_a(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node_a=document.createElement('div');
		el.ggId="ht_node_a";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 82px;';
		hs+='position : absolute;';
		hs+='top : 70px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_a.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node_a.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_a.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_a.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_node_a.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_node_a.ggCurrentLogicStateScaling == 0) {
					me._ht_node_a.ggParameter.sx = 0.8;
					me._ht_node_a.ggParameter.sy = 0.8;
					me._ht_node_a.style[domTransform]=parameterToTransform(me._ht_node_a.ggParameter);
				}
				else {
					me._ht_node_a.ggParameter.sx = 1;
					me._ht_node_a.ggParameter.sy = 1;
					me._ht_node_a.style[domTransform]=parameterToTransform(me._ht_node_a.ggParameter);
				}
			}
		}
		me._ht_node_a.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_a.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_a.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node_a']=true;
			me._preview_nodeimage_a.logicBlock_scaling();
			me._preview_nodeimage_a.logicBlock_alpha();
			me._hs_logo_node.logicBlock_alpha();
			me._hs_logo_node.logicBlock_scaling();
			me._hs_image_a.logicBlock_scaling();
			me._hs_image_a.logicBlock_size();
			me._tt_ht_node_a.logicBlock_alpha();
			me._tt_ht_node_a.logicBlock_position();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_a.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node_a']=false;
			me._preview_nodeimage_a.logicBlock_scaling();
			me._preview_nodeimage_a.logicBlock_alpha();
			me._hs_logo_node.logicBlock_alpha();
			me._hs_logo_node.logicBlock_scaling();
			me._hs_image_a.logicBlock_scaling();
			me._hs_image_a.logicBlock_size();
			me._tt_ht_node_a.logicBlock_alpha();
			me._tt_ht_node_a.logicBlock_position();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node_a.ontouchend=function (e) {
			me.elementMouseOver['ht_node_a']=false;
			me._preview_nodeimage_a.logicBlock_scaling();
			me._preview_nodeimage_a.logicBlock_alpha();
			me._hs_logo_node.logicBlock_alpha();
			me._hs_logo_node.logicBlock_scaling();
			me._hs_image_a.logicBlock_scaling();
			me._hs_image_a.logicBlock_size();
			me._tt_ht_node_a.logicBlock_alpha();
			me._tt_ht_node_a.logicBlock_position();
		}
		me._ht_node_a.ggUpdatePosition=function (useTransition) {
		}
		el=me._hsimage_a=document.createElement('div');
		els=me._hsimage_a__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEgQmFzaWMvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtYmFzaWMuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE0LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgNDMzNjMpICAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGJhc2VQcm9maWxlPSJiYXNpYyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheW'+
			'VyXzEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgaGVpZ2h0PSIzMnB4IiB5PSIwcHgiIHg9IjBweCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMnB4IiB2ZXJzaW9uPSIxLjEiPgogPGcgb3BhY2l0eT0iMC40Ij4KICA8Zz4KICAgPHBhdGggc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTI2LjYwNCwxNC4xMDNoLTEuOTg5Yy0wLjczNC0zLjM1LTMuMzY4LTUuOTgxLTYuNzE2LTYuNzE3VjUuMzk4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLTEuMDQ4LTAuODQ5LTEuODk5LTEuODk3LTEuODk5Yy0xLjA0OSwwLTEuODk3LDAu'+
			'ODUxLTEuODk3LDEuODk5djEuOTg2Yy0zLjM1MiwwLjczNS01Ljk4MywzLjM2OS02LjcyLDYuNzE3SDUuMzk4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M0LjM0OCwxNC4xMDEsMy41LDE0Ljk1MSwzLjUsMTZzMC44NTEsMS44OTYsMS44OTksMS44OTZoMS45ODVjMC43MzUsMy4zNSwzLjM2OCw1Ljk4NCw2LjcyLDYuNzE5djEuOTg5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLDEuMDQ2LDAuODQ4LDEuODk2LDEuODk3LDEuODk2YzEuMDQ4LDAsMS44OTYtMC44NTEsMS44OTYtMS44OTZ2LTEuOTg5YzMuMzUxLTAuNzM2LDUuOTg0LTMuMzY5LDYuNzE5LTYuNzE5aDEuOTg2JiN4ZDsmI3hhOy'+
			'YjeDk7JiN4OTsmI3g5O2MxLjA0OSwwLDEuODk3LTAuODQ4LDEuODk3LTEuODk2QzI4LjUwMSwxNC45NTEsMjcuNjUyLDE0LjEwMywyNi42MDQsMTQuMTAzeiBNMTYsMjEuMDI5Yy0yLjc3Ny0wLjAwNS01LjAyMy0yLjI1MS01LjAzLTUuMDI2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O3YtMC4wMDFjMC0wLjAwMSwwLTAuMDAxLDAtMC4wMDNjMC4wMDYtMi43NzcsMi4yNTMtNS4wMjIsNS4wMy01LjAyNWMyLjc3NywwLjAwNSw1LjAyNSwyLjI1MSw1LjAyNiw1LjAyOGgwLjAwMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjEuMDI1LDE4Ljc3OCwxOC43NzcsMjEuMDI0LDE2LDIxLjAyOXoiLz4K'+
			'ICA8L2c+CiAgPGNpcmNsZSBjeD0iMTYuMDAyIiByPSIyLjEwOSIgY3k9IjE2IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+CiA8Zz4KICA8Zz4KICAgPHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTTI2LjYwNCwxNC4xMDNoLTEuOTg5Yy0wLjczNC0zLjM1LTMuMzY4LTUuOTgxLTYuNzE2LTYuNzE3VjUuMzk4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLTEuMDQ4LTAuODQ5LTEuODk5LTEuODk3LTEuODk5Yy0xLjA0OSwwLTEuODk3LDAuODUxLTEuODk3LDEuODk5djEuOTg2Yy0zLjM1MiwwLjczNS01Ljk4MywzLjM2OS02LjcyLDYuNz'+
			'E3SDUuMzk4JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0M0LjM0OCwxNC4xMDEsMy41LDE0Ljk1MSwzLjUsMTZzMC44NTEsMS44OTYsMS44OTksMS44OTZoMS45ODVjMC43MzUsMy4zNSwzLjM2OCw1Ljk4NCw2LjcyLDYuNzE5djEuOTg5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLDEuMDQ2LDAuODQ4LDEuODk2LDEuODk3LDEuODk2YzEuMDQ4LDAsMS44OTYtMC44NTEsMS44OTYtMS44OTZ2LTEuOTg5YzMuMzUxLTAuNzM2LDUuOTg0LTMuMzY5LDYuNzE5LTYuNzE5aDEuOTg2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MxLjA0OSwwLDEuODk3LTAuODQ4LDEuODk3LTEuODk2QzI4LjUwMSwx'+
			'NC45NTEsMjcuNjUyLDE0LjEwMywyNi42MDQsMTQuMTAzeiBNMTYsMjEuMDI5Yy0yLjc3Ny0wLjAwNS01LjAyMy0yLjI1MS01LjAzLTUuMDI2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O3YtMC4wMDFjMC0wLjAwMSwwLTAuMDAxLDAtMC4wMDNjMC4wMDYtMi43NzcsMi4yNTMtNS4wMjIsNS4wMy01LjAyNWMyLjc3NywwLjAwNSw1LjAyNSwyLjI1MSw1LjAyNiw1LjAyOGgwLjAwMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDMjEuMDI1LDE4Ljc3OCwxOC43NzcsMjEuMDI0LDE2LDIxLjAyOXoiLz4KICA8L2c+CiAgPGNpcmNsZSBjeD0iMTYuMDAyIiByPSIyLjEwOSIgY3k9IjE2IiBmaWxsPSIjRk'+
			'ZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._hsimage_a__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hsimage_a";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hsimage_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hsimage_a.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hsimage_a.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hsimage_a.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hsimage_a.style[domTransition]='';
				if (me._hsimage_a.ggCurrentLogicStateVisible == 0) {
					me._hsimage_a.style.visibility="hidden";
					me._hsimage_a.ggVisible=false;
				}
				else {
					me._hsimage_a.style.visibility="hidden";
					me._hsimage_a.ggVisible=false;
				}
			}
		}
		me._hsimage_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_node_a.appendChild(me._hsimage_a);
		el=me._preview_nodeimage_a=document.createElement('div');
		els=me._preview_nodeimage_a__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_a_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage_a";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.34,sy:0.34 };
		el.ggVisible=false;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		hs+='border-radius: 999px; overflow: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._preview_nodeimage_a.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage_a.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._preview_nodeimage_a.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._preview_nodeimage_a.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._preview_nodeimage_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._preview_nodeimage_a.ggCurrentLogicStateScaling == 0) {
					me._preview_nodeimage_a.ggParameter.sx = 1;
					me._preview_nodeimage_a.ggParameter.sy = 1;
					me._preview_nodeimage_a.style[domTransform]=parameterToTransform(me._preview_nodeimage_a.ggParameter);
				}
				else {
					me._preview_nodeimage_a.ggParameter.sx = 0.34;
					me._preview_nodeimage_a.ggParameter.sy = 0.34;
					me._preview_nodeimage_a.style[domTransform]=parameterToTransform(me._preview_nodeimage_a.ggParameter);
				}
			}
		}
		me._preview_nodeimage_a.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._preview_nodeimage_a.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._preview_nodeimage_a.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._preview_nodeimage_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._preview_nodeimage_a.ggCurrentLogicStateAlpha == 0) {
					me._preview_nodeimage_a.style.visibility=me._preview_nodeimage_a.ggVisible?'inherit':'hidden';
					me._preview_nodeimage_a.style.opacity=1;
				}
				else {
					me._preview_nodeimage_a.style.visibility=me._preview_nodeimage_a.ggVisible?'inherit':'hidden';
					me._preview_nodeimage_a.style.opacity=1;
				}
			}
		}
		me._preview_nodeimage_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._ht_checkmark_tick_a=document.createElement('div');
		els=me._ht_checkmark_tick_a__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOmk9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVJbGx1c3RyYXRvci8xMC4wLyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzcyMiAtMjYwNiAzMiAzMiIgeG1sbn'+
			'M9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4PSJodHRwOi8vbnMuYWRvYmUuY29tL0V4dGVuc2liaWxpdHkvMS4wLyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIgdmlld0JveD0iLTM3MjIgLTI2MDYgMzIgMzIiIGhlaWdodD0iMzJweCIgeT0iMHB4IiB4PSIwcHgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgdmVyc2lvbj0iMS4xIiB4bWxuczpncmFwaD0iaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyI+CiA8'+
			'ZyBpZD0iTGF5ZXJfMSIvPgogPGcgaWQ9IkViZW5lXzEiLz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPGc+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAuMzc5LDAuOTMsMC4zNzkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5OyYjeDk7JiN4OTtjMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0zNjk5Ljk2LTI1ODMuODM3aC0xMi4zMjV2LTEyLjMyNmgxMS44MjFsMi4yNTItMi4yNTJjLTAuMTY2LTAuMDg2LTAuMzUyLTAuMTQxLTAuNTUyLTAuMTQxaC0xNC43MTgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MTQuNzE5YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5'+
			'NmgxNC43MThjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtMTAuNDAzJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7bC0yLjM5MywyLjM5M1YtMjU4My44Mzd6Ii8+CiAgIDwvZz4KICAgPGcgb3BhY2l0eT0iMC40IiBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im11bHRpcGx5Ij4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgYTphZG9iZS1ibGVuZGluZy1tb2RlPSJub3JtYWwiIGQ9IiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0'+
			'0tMzY5NS40NzMtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40'+
			'NzMtMjU5OC4xNDZ6Ii8+CiAgICA8cGF0aCBzdHJva2U9IiMxQTE3MUIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibm9ybWFsIiBkPSImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLj'+
			'E5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0MyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAy'+
			'Yy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxN0MtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTM2OTkuOTYtMjU4My44MzdoLTEyLjMyNXYtMTIuMzI2aDExLjgyMWwyLjI1Mi0yLjI1MmMtMC4xNjYtMC4wODYtMC4zNTItMC4xNDEtMC41NTItMC4xNDFoLTE0LjcxOC'+
			'YjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYxNC43MTljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDE0LjcxOGMwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2di0xMC40MDMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtsLTIuMzkzLDIuMzkzVi0yNTgzLjgzN3oiLz4KICAgPC9nPgogICA8Zz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTS0zNjk1LjQ3'+
			'My0yNTk4LjE0NiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MtMC41MTktMC41MTktMS4zNjEtMC41MTktMS44NzksMGwtOC43ODcsOC43ODdsLTIuMjkxLTIuMjQzYy0wLjUyNS0wLjUxMy0xLjM2Ni0wLjUwNC0xLjg4LDAuMDImI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjLTAuNTEzLDAuNTI1LTAuNTA0LDEuMzY3LDAuMDIxLDEuODhsMy4yMywzLjE2M2MwLjI1OSwwLjI1MywwLjU5NCwwLjM3OSwwLjkzLDAuMzc5YzAuMzQsMCwwLjY4LTAuMTMsMC45NC0wLjM5bDkuNzE3LTkuNzE3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7Qy0zNjk0Ljk1NC0yNTk2Ljc4NS0zNj'+
			'k0Ljk1NC0yNTk3LjYyNi0zNjk1LjQ3My0yNTk4LjE0NnoiLz4KICAgIDxwYXRoIHN0cm9rZT0iIzFBMTcxQiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTS0zNjk5Ljk2LTI1ODMuODM3JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7aC0xMi4zMjV2LTEyLjMyNmgxMS44MjFsMi4yNTItMi4yNTJjLTAuMTY2LTAuMDg2LTAuMzUyLTAuMTQxLTAuNTUyLTAuMTQxaC0xNC43MThjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MTQuNzE5JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5'+
			'OyYjeDk7YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgxNC43MThjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtMTAuNDAzbC0yLjM5MywyLjM5M1YtMjU4My44Mzd6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_checkmark_tick_a__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_checkmark_tick_a";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 30px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : 10px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_checkmark_tick_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_checkmark_tick_a.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._ht_checkmark_tick_a.ggElementNodeId()) == true)) || 
				((me._ht_checkmark_tick_a.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_checkmark_tick_a.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_checkmark_tick_a.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_checkmark_tick_a.style[domTransition]='';
				if (me._ht_checkmark_tick_a.ggCurrentLogicStateVisible == 0) {
					me._ht_checkmark_tick_a.style.visibility=(Number(me._ht_checkmark_tick_a.style.opacity)>0||!me._ht_checkmark_tick_a.style.opacity)?'inherit':'hidden';
					me._ht_checkmark_tick_a.ggVisible=true;
				}
				else {
					me._ht_checkmark_tick_a.style.visibility="hidden";
					me._ht_checkmark_tick_a.ggVisible=false;
				}
			}
		}
		me._ht_checkmark_tick_a.ggUpdatePosition=function (useTransition) {
		}
		me._preview_nodeimage_a.appendChild(me._ht_checkmark_tick_a);
		me._ht_node_a.appendChild(me._preview_nodeimage_a);
		el=me._hs_logo_node=document.createElement('div');
		els=me._hs_logo_node__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODEuOTcgMzc5LjEyIj4KIDxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgIDxwYXRoIGZpbGw9IiNmM2RiN2UiIGQ9Ik0zODIsMTg5LjU1YzAsMTA0LjctODUuNTEsMTg5LjU3LTE5MSwxODkuNTdTMCwyOTQuMjUsMCwxODkuNTUsODUuNSwwLDE5MSwwLDM4Miw4NC44NywzODIsMTg5LjU1WiIvPgogICA8cGF0aCBmaWxsPSIjMGE2YmFkIiBkPSJNMjYyLjQ4LDIyNC41N2MtMjUuNi0xMS4wNi0yMS4wNS0zMi'+
			'43OC0yMC4yNC0zNS45LDcuMTUtMjUuMzQsMzguNzItNTUuODQsNzUuMzEtNzAuMjEtMjkuNzQtMjEuNTMtNjAuMDcsMi40NC02MC4wNywyLjQ0czUuNzUtNy4yNCwyOC4wNi0xNi43OGMtMjAuODUsMi41NC00MS40OCwxMC4yMy01Ni44NSwzMC4zMi0xNy4wOCwyMi4yOS0xMC4xNiw1MS43Ni0yLjMxLDcxLjE0LTE2Ljg5LTEyLjcxLTI4LjQ1LTI5LjkzLTQyLTU5LjEtMzAuOTUtNzEuODUtMTM3LTQ0LjQxLTEzNy00NC40MXM1OS4wOSwyLjY4LDgyLjk1LDQ5LjE5YzM1LjMzLDY4LjkyLDc5LjE0LDczLjI2LDc5LjE0LDczLjI2LTQ3LjIxLTMuMTQtNTIuODEsMzAuMzItNTIuODEsMzAuMzJzMTQu'+
			'MjctNC41MSwyOC4zOC0yLjEyYzQxLjEsNyw3Ni43OC0yMC40LDgxLjY5LTI1LjU3LjA5LS4wOS4xNi0uMTguMjQtLjI3YTIuMiwyLjIsMCwwLDAsLjM0LS40NkMyNjUuNjUsMjI1LjgsMjY0LjA1LDIyNS4xOSwyNjIuNDgsMjI0LjU3WiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMDcuMjEsMjkzLjUxYy4yNy0uNzEuNDYtMS4xNS41OS0xLjU5LDEuMTYtMy44NCwyLjM1LTcuNjcsMy40NC0xMS41Mi4zLTEuMTEuNzYtMS42MiwyLTEuNTcsMi40Mi4xLDQuODUsMCw3LjI1LDAsLjc3LDAsMS4zLjEsMS4zLDEuMTFxMCwxMywwLDI2LjE0YTMuMTcsMy'+
			'4xNywwLDAsMS0uMTEuNjFIMTE0di0xM2wtLjI1LS4wOGMtLjE4LjU2LS40MSwxLjExLS41NiwxLjY4LS45NCwzLjM5LTEuODksNi43OC0yLjc2LDEwLjE5LS4yNiwxLS42NiwxLjM5LTEuNzIsMS4yOC0xLjQxLS4xMy0zLjI0LjQtNC4xNi0uM3MtMS0yLjU0LTEuMzUtMy44OXEtMS4xNy00LjA5LTIuMzEtOC4xOWExLDEsMCwwLDAtLjQ4LS42OHYxMi45M0g5Mi42OWMwLS40Ny0uMDgtLjg5LS4wOC0xLjMxLDAtOC4zMiwwLTE2LjY1LDAtMjUsMC0xLjIxLjMyLTEuNjMsMS41Ny0xLjU5LDIuMzcuMDcsNC43NC4wOCw3LjEyLDAsMS4xNSwwLDEuNTguNDMsMS44OCwxLjQ4LDEuMTIsMy44NiwyLjMy'+
			'LDcuNjgsMy41LDExLjVDMTA2Ljc5LDI5Mi4yOSwxMDcsMjkyLjcyLDEwNy4yMSwyOTMuNTFaIi8+CiAgIDxwYXRoIGZpbGw9IiNkOTI3MjgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE0NC4xMiwzMDYuNzlWMjg4LjY3YzAtMi44NCwwLTUuNjgsMC04LjUyLDAtLjY3LDAtMS4zMS45My0xLjI4LDQuMzQuMTQsOC43MS0uMDgsMTMsLjQ3YTExLjkyLDExLjkyLDAsMCwxLDEwLjIxLDExLjQ1LDIwLDIwLDAsMCwxLS45NCw4LjI2Yy0xLjksNS4wOS01LjkzLDcuMzItMTEuMDUsNy42N0MxNTIuMjksMzA3LDE0OC4yOSwzMDYuNzksMTQ0LjEyLDMwNi43OVptMTAtMjAuNDljLS42OC4wNy0xLjU5LS'+
			'4yOS0xLjU3LDEuMDUsMCwzLjUyLDAsNywwLDEwLjU2LDAsLjM0LjQ0LDEsLjcsMSwzLjE5LjE3LDUuNjgtLjU0LDYuNDMtMy45M2ExMS4zLDExLjMsMCwwLDAsLjEyLTMuNzZDMTU5LjQsMjg3Ljg2LDE1Ny41NSwyODYuMzQsMTU0LjExLDI4Ni4zWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yODguMzksMjkwLjM2Yy0yLjYzLDAtNS4xOSwwLTcuNzQsMC0uMzMsMC0uNzYtLjUtLjk1LS44Ny0xLjQ5LTIuODktMy44MS00LjA5LTYuNzQtMy40NGE2LjI2LDYuMjYsMCwwLDAtNC42MSw2LjEyLDEwLDEwLDAsMCwwLC44NCwzLjkzLDUuMzgsNS4zOCww'+
			'LDAsMCw0Ljg2LDMuMjgsNS4yOCw1LjI4LDAsMCwwLDUuMzEtMywyLjI2LDIuMjYsMCwwLDEsMi40NS0xLjM1YzIuMTYuMDgsNC4zMiwwLDYuNDQsMCwuNzgsNC44Ny01LjcxLDExLjEtMTIuMDUsMTEuNzhhMTQuNDUsMTQuNDUsMCwwLDEtMTYuMy0xMy40OCwxNC4yMSwxNC4yMSwwLDAsMSwxMy41My0xNC44N0MyODEuMzMsMjc4LjIzLDI4OC41LDI4My44MSwyODguMzksMjkwLjM2WiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMTcuNDUsMzA2LjgxYy0yLjc4LDAtNS40OS4wNS04LjE5LDAtLjM1LDAtLjg0LS41Ni0xLTEtMS4wOS0zLjExLTEuMD'+
			'ctMy4xMS00LjM1LTMuMTFoLS40NGMtMS4yNCwwLTIuNzQtLjQtMy42My4xN3MtLjk0LDIuMDgtMS40OCwzLjE1YTEuNSwxLjUsMCwwLDEtMSwuNzhjLTIuNjUuMDYtNS4zMSwwLTguMiwwbDEuMTEtMi44NWMzLjE0LTcuOTEsNi4yOS0xNS44MSw5LjM5LTIzLjc0YTEuNzgsMS43OCwwLDAsMSwyLTEuMzljMS4yOC4wOSwyLjU4LS4wNiwzLjg1LjA2YTIsMiwwLDAsMSwxLjQxLjg5YzMuNDksOC43Miw2LjkxLDE3LjQ3LDEwLjM0LDI2LjIxQTUuNzUsNS43NSwwLDAsMSwyMTcuNDUsMzA2LjgxWm0tMTMuODQtMTUuNjNoLS4zNmwtMS4zNyw0LjVoMy4wNloiLz4KICAgPHBhdGggZmlsbD0iI2Q5Mjcy'+
			'OCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTMzLjE1LDI4OC43Mmg3LjUydjcuNDVoLTcuNTV2Mi43NWg3Ljc5djcuOEgxMjVjMC0uNC0uMDktLjgyLS4wOS0xLjI0LDAtOC4zNywwLTE2Ljc2LDAtMjUuMTEsMC0xLjE1LjMyLTEuNTQsMS40OC0xLjUzLDQuMzkuMDUsOC43OCwwLDEzLjE3LDAsMS4wOSwwLDEuNjIuMjQsMS41NSwxLjQ3LS4xMSwxLjkxLDAsMy44MSwwLDZoLTYuMDlDMTMyLjg1LDI4Ni4zLDEzMi44NSwyODYuMywxMzMuMTUsMjg4LjcyWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNDEuNTQsMzA2LjgyYzAtLjY2LS4wOC0xLj'+
			'E2LS4wOC0xLjYzLDAtOC4yMiwwLTE2LjQ0LDAtMjQuNjYsMC0xLjI1LjMxLTEuNzMsMS42NC0xLjY5LDQuMjkuMDcsOC41OS4wNSwxMi44NywwLDEuMjIsMCwxLjY4LjQsMS42MiwxLjYxYTM4LDM4LDAsMCwwLDAsNC4yN2MuMSwxLjMzLS40NiwxLjY3LTEuNzEsMS42MS0xLjY4LS4xMS0zLjM2LDAtNSwwLS44NSwwLTEuMzguMTMtMS4zOSwxLjE3cy41MywxLjI4LDEuNDYsMS4yNWMxLjY3LDAsMy4zNS4wNiw1LDAsMS4wNi0uMDUsMS4zOS4zNSwxLjM2LDEuMzUtLjA1LDEuNi0uMDUsMy4yMywwLDQuODUsMCwxLS4zLDEuMzgtMS4zNiwxLjMzLTIuMDUtLjA4LTQuMTIsMC02LjE1LDAtLjc0LDIu'+
			'MzQtLjQ5LDIuNzMsMS43NiwyLjczLDEuNjIsMCwzLjI1LDAsNC44NywwLC44MSwwLDEuMTcuMjksMS4xNiwxLjEsMCwxLjksMCwzLjgyLDAsNS43MywwLC43MS0uMjUsMS4wNi0xLDEuMDZDMjUxLjU4LDMwNi44LDI0Ni42NiwzMDYuODIsMjQxLjU0LDMwNi44MloiLz4KICAgPHBhdGggZmlsbD0iI2Q5MjcyOCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjIxLjY3LDMwNi43MVYyODguNTNjMC0yLjIzLDAtMi4yMy0yLjIyLTIuMjNoLTUuMzd2LTcuMjNIMjM4LjZ2Ny4yM2MtMS44OCwwLTMuNzguMDctNS42NywwLTEuNDYtLjA4LTIsLjMxLTEuOTMsMS44NS4wOSw1LjYyLDAsMTEuMjYsMCwxNi'+
			'44OHYxLjcxWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODYuODQsMjk5djcuNzdhNS43OSw1Ljc5LDAsMCwxLS43Ni4wOGMtNC42MywwLTkuMjYsMC0xMy45MSwwLTEsMC0xLjMtLjMxLTEuMy0xLjI2LDAtOC40NywwLTE2LjkyLDAtMjUuNCwwLTEuMDUuNDgtMS4zNSwxLjQ0LTEuMzIsMS44NywwLDMuNzQsMCw1LjYyLDAsMS4wNi0uMDUsMS4zMS40MiwxLjMxLDEuMzksMCw1LjY4LDAsMTEuMzYtLjA1LDE3LDAsMS40LjQ3LDEuNzYsMS43OCwxLjdDMTgyLjg3LDI5OC44OSwxODQuOCwyOTksMTg2Ljg0LDI5OVoiLz4KICA8L2c+CiA8L2c+Cjwv'+
			'c3ZnPgo=';
		me._hs_logo_node__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_logo_node";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_logo_node.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_logo_node.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_logo_node.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_logo_node.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_logo_node.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._hs_logo_node.ggCurrentLogicStateScaling == 0) {
					me._hs_logo_node.ggParameter.sx = 3;
					me._hs_logo_node.ggParameter.sy = 3;
					me._hs_logo_node.style[domTransform]=parameterToTransform(me._hs_logo_node.ggParameter);
				}
				else {
					me._hs_logo_node.ggParameter.sx = 1;
					me._hs_logo_node.ggParameter.sy = 1;
					me._hs_logo_node.style[domTransform]=parameterToTransform(me._hs_logo_node.ggParameter);
				}
			}
		}
		me._hs_logo_node.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_logo_node.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_logo_node.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_logo_node.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._hs_logo_node.ggCurrentLogicStateAlpha == 0) {
					me._hs_logo_node.style.visibility=me._hs_logo_node.ggVisible?'inherit':'hidden';
					me._hs_logo_node.style.opacity=1;
				}
				else {
					me._hs_logo_node.style.visibility=me._hs_logo_node.ggVisible?'inherit':'hidden';
					me._hs_logo_node.style.opacity=1;
				}
			}
		}
		me._hs_logo_node.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_node_a.appendChild(me._hs_logo_node);
		el=me._hs_image_a=document.createElement('div');
		el.ggId="hs_image_a";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 2px solid #ffffff;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_image_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_image_a.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._hs_image_a.ggCurrentLogicStateSize != newLogicStateSize) {
				me._hs_image_a.ggCurrentLogicStateSize = newLogicStateSize;
				me._hs_image_a.style[domTransition]='width 0s, height 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_a.ggCurrentLogicStateSize == 0) {
					me._hs_image_a.style.width='140px';
					me._hs_image_a.style.height='140px';
					skin.updateSize(me._hs_image_a);
				}
				else {
					me._hs_image_a.style.width='48px';
					me._hs_image_a.style.height='48px';
					skin.updateSize(me._hs_image_a);
				}
			}
		}
		me._hs_image_a.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateScaling = 1;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_image_a.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_image_a.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_image_a.style[domTransition]='width 0s, height 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_a.ggCurrentLogicStateScaling == 0) {
					me._hs_image_a.ggParameter.sx = 1;
					me._hs_image_a.ggParameter.sy = 1;
					me._hs_image_a.style[domTransform]=parameterToTransform(me._hs_image_a.ggParameter);
				}
				else if (me._hs_image_a.ggCurrentLogicStateScaling == 1) {
					me._hs_image_a.ggParameter.sx = 0.8;
					me._hs_image_a.ggParameter.sy = 0.8;
					me._hs_image_a.style[domTransform]=parameterToTransform(me._hs_image_a.ggParameter);
				}
				else {
					me._hs_image_a.ggParameter.sx = 1;
					me._hs_image_a.ggParameter.sy = 1;
					me._hs_image_a.style[domTransform]=parameterToTransform(me._hs_image_a.ggParameter);
				}
			}
		}
		me._hs_image_a.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_image_a.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_image_a.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_image_a.style[domTransition]='width 0s, height 0s, ' + cssPrefix + 'transform 500ms ease 0ms';
				if (me._hs_image_a.ggCurrentLogicStateVisible == 0) {
					me._hs_image_a.style.visibility="hidden";
					me._hs_image_a.ggVisible=false;
				}
				else {
					me._hs_image_a.style.visibility=(Number(me._hs_image_a.style.opacity)>0||!me._hs_image_a.style.opacity)?'inherit':'hidden';
					me._hs_image_a.ggVisible=true;
				}
			}
		}
		me._hs_image_a.onmouseover=function (e) {
			me.elementMouseOver['hs_image_a']=true;
			me._hs_ring_a.logicBlock_visible();
		}
		me._hs_image_a.onmouseout=function (e) {
			me.elementMouseOver['hs_image_a']=false;
			me._hs_ring_a.logicBlock_visible();
		}
		me._hs_image_a.ontouchend=function (e) {
			me.elementMouseOver['hs_image_a']=false;
			me._hs_ring_a.logicBlock_visible();
		}
		me._hs_image_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._hs_ring_a=document.createElement('div');
		el.ggId="hs_ring_a";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 2px solid #16365d;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_ring_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_ring_a.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('var_hs') == 2))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._hs_ring_a.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._hs_ring_a.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._hs_ring_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_a.ggCurrentLogicStateScaling == 0) {
					me._hs_ring_a.ggParameter.sx = 3;
					me._hs_ring_a.ggParameter.sy = 3;
					me._hs_ring_a.style[domTransform]=parameterToTransform(me._hs_ring_a.ggParameter);
				}
				else {
					me._hs_ring_a.ggParameter.sx = 1;
					me._hs_ring_a.ggParameter.sy = 1;
					me._hs_ring_a.style[domTransform]=parameterToTransform(me._hs_ring_a.ggParameter);
				}
			}
		}
		me._hs_ring_a.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['hs_image_a'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_ring_a.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_ring_a.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_ring_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_a.ggCurrentLogicStateVisible == 0) {
					me._hs_ring_a.style.visibility="hidden";
					me._hs_ring_a.ggVisible=false;
				}
				else {
					me._hs_ring_a.style.visibility=(Number(me._hs_ring_a.style.opacity)>0||!me._hs_ring_a.style.opacity)?'inherit':'hidden';
					me._hs_ring_a.ggVisible=true;
				}
			}
		}
		me._hs_ring_a.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('var_hs') == 2)) || 
				((player.getVariableValue('var_hs') == 3))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_ring_a.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_ring_a.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_ring_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_a.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._hs_ring_a.style.opacity == 0.0) { me._hs_ring_a.style.visibility="hidden"; } }, 505);
					me._hs_ring_a.style.opacity=0;
				}
				else {
					me._hs_ring_a.style.visibility=me._hs_ring_a.ggVisible?'inherit':'hidden';
					me._hs_ring_a.style.opacity=1;
				}
			}
		}
		me._hs_ring_a.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((player.getVariableValue('var_hs') == 0)) || 
				((player.getVariableValue('var_hs') == 1))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._hs_ring_a.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._hs_ring_a.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._hs_ring_a.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms, opacity 500ms ease 0ms, border-color 0s';
				if (me._hs_ring_a.ggCurrentLogicStateBorderColor == 0) {
					me._hs_ring_a.style.borderColor="rgba(255,255,255,1)";
				}
				else {
					me._hs_ring_a.style.borderColor="rgba(22,54,93,1)";
				}
			}
		}
		me._hs_ring_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hs_image_a.appendChild(me._hs_ring_a);
		me._ht_node_a.appendChild(me._hs_image_a);
		el=me._tt_ht_node_a=document.createElement('div');
		els=me._tt_ht_node_a__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_node_a";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 27px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 160px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #253d8f;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 6px;';
		hs+=cssPrefix + 'border-radius: 6px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 6px 7px 6px 7px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_node_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_node_a.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.elementMouseOver['ht_node_a'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_node_a.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_node_a.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_node_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_node_a.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_node_a.style.bottom='75px';
					me._tt_ht_node_a.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_node_a.ggDx=0;
					me._tt_ht_node_a.style.bottom='27px';
					me._tt_ht_node_a.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_node_a.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true)) || 
				((me.elementMouseOver['ht_node_a'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._tt_ht_node_a.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._tt_ht_node_a.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._tt_ht_node_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_node_a.ggCurrentLogicStateAlpha == 0) {
					me._tt_ht_node_a.style.visibility=me._tt_ht_node_a.ggVisible?'inherit':'hidden';
					me._tt_ht_node_a.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._tt_ht_node_a.style.opacity == 0.0) { me._tt_ht_node_a.style.visibility="hidden"; } }, 505);
					me._tt_ht_node_a.style.opacity=0;
				}
			}
		}
		me._tt_ht_node_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((166-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_node_a.appendChild(me._tt_ht_node_a);
		el=me._ht_node_customimage_a=document.createElement('div');
		els=me._ht_node_customimage_a__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_node_customimage_a.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_CustomImage_a";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_customimage_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_customimage_a.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage_a.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage_a.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_customimage_a.style[domTransition]='';
				if (me._ht_node_customimage_a.ggCurrentLogicStateVisible == 0) {
					me._ht_node_customimage_a.style.visibility="hidden";
					me._ht_node_customimage_a__img.src = '';
					me._ht_node_customimage_a.ggVisible=false;
				}
				else {
					me._ht_node_customimage_a.style.visibility=(Number(me._ht_node_customimage_a.style.opacity)>0||!me._ht_node_customimage_a.style.opacity)?'inherit':'hidden';
					me._ht_node_customimage_a.ggSubElement.src=me._ht_node_customimage_a.ggText;
					me._ht_node_customimage_a.ggVisible=true;
				}
			}
		}
		me._ht_node_customimage_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_node_customimage_a.clientWidth;
			var parentHeight = me._ht_node_customimage_a.clientHeight;
			var img = me._ht_node_customimage_a__img;
			var aspectRatioDiv = me._ht_node_customimage_a.clientWidth / me._ht_node_customimage_a.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_node_a.appendChild(me._ht_node_customimage_a);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_node_a;
	};
	function SkinHotspotClass_ht_ring(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_ring=document.createElement('div');
		el.ggId="ht_ring";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 65px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_ring.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_ring.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_ring.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_ring.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._ht_ring.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._ht_ring.ggCurrentLogicStateScaling == 0) {
					me._ht_ring.ggParameter.sx = 0.8;
					me._ht_ring.ggParameter.sy = 0.8;
					me._ht_ring.style[domTransform]=parameterToTransform(me._ht_ring.ggParameter);
				}
				else {
					me._ht_ring.ggParameter.sx = 1;
					me._ht_ring.ggParameter.sy = 1;
					me._ht_ring.style[domTransform]=parameterToTransform(me._ht_ring.ggParameter);
				}
			}
		}
		me._ht_ring.onclick=function (e) {
			skin._tooltip_hs.ggText="";
			skin._tooltip_hs.ggTextDiv.innerHTML=skin._tooltip_hs.ggText;
			if (skin._tooltip_hs.ggUpdateText) {
				skin._tooltip_hs.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._tooltip_hs.ggUpdatePosition) {
				skin._tooltip_hs.ggUpdatePosition();
			}
			skin._tooltip_hs.ggTextDiv.scrollTop = 0;
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin._thumb_ex.ggText=basePath + "";
			skin._thumb_ex.ggSubElement.style.width = '0px';
			skin._thumb_ex.ggSubElement.style.height = '0px';
			skin._thumb_ex.ggSubElement.src='';
			skin._thumb_ex.ggSubElement.src=skin._thumb_ex.ggText;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_ring.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_ring.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			if (
				(
					((player.getVariableValue('tran_en') == false)) && 
					((me.hotspot.title != ""))
				)
			) {
				skin._tooltip_hs.ggText=me.hotspot.title;
				skin._tooltip_hs.ggTextDiv.innerHTML=skin._tooltip_hs.ggText;
				if (skin._tooltip_hs.ggUpdateText) {
					skin._tooltip_hs.ggUpdateText=function() {
						var hs=me.hotspot.title;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._tooltip_hs.ggUpdatePosition) {
					skin._tooltip_hs.ggUpdatePosition();
				}
				skin._tooltip_hs.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true)) && 
					((me.hotspot.description != ""))
				)
			) {
				skin._tooltip_hs.ggText=me.hotspot.description;
				skin._tooltip_hs.ggTextDiv.innerHTML=skin._tooltip_hs.ggText;
				if (skin._tooltip_hs.ggUpdateText) {
					skin._tooltip_hs.ggUpdateText=function() {
						var hs=me.hotspot.description;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._tooltip_hs.ggUpdatePosition) {
					skin._tooltip_hs.ggUpdatePosition();
				}
				skin._tooltip_hs.ggTextDiv.scrollTop = 0;
			}
			skin._thumb_ex.ggText=basePath + "images\/nodeimage_thumb_"+me.ggUserdata.nodeid+".jpg";
			skin._thumb_ex.ggSubElement.style.width = '0px';
			skin._thumb_ex.ggSubElement.style.height = '0px';
			skin._thumb_ex.ggSubElement.src='';
			skin._thumb_ex.ggSubElement.src=skin._thumb_ex.ggText;
			me.elementMouseOver['ht_ring']=true;
			me._tt_ht_ring_a.logicBlock_position();
			me._tt_ht_ring_a.logicBlock_alpha();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_ring.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin._tooltip_hs.ggText="";
			skin._tooltip_hs.ggTextDiv.innerHTML=skin._tooltip_hs.ggText;
			if (skin._tooltip_hs.ggUpdateText) {
				skin._tooltip_hs.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._tooltip_hs.ggUpdatePosition) {
				skin._tooltip_hs.ggUpdatePosition();
			}
			skin._tooltip_hs.ggTextDiv.scrollTop = 0;
			skin._thumb_ex.ggText=basePath + "";
			skin._thumb_ex.ggSubElement.style.width = '0px';
			skin._thumb_ex.ggSubElement.style.height = '0px';
			skin._thumb_ex.ggSubElement.src='';
			skin._thumb_ex.ggSubElement.src=skin._thumb_ex.ggText;
			me.elementMouseOver['ht_ring']=false;
			me._tt_ht_ring_a.logicBlock_position();
			me._tt_ht_ring_a.logicBlock_alpha();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_ring.ontouchend=function (e) {
			me.elementMouseOver['ht_ring']=false;
			me._tt_ht_ring_a.logicBlock_position();
			me._tt_ht_ring_a.logicBlock_alpha();
		}
		me._ht_ring.ggUpdatePosition=function (useTransition) {
		}
		el=me._ring=document.createElement('div');
		els=me._ring__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._ring__img.setAttribute('src',basePath + 'images/ring.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;animation-name: stretch; animation-duration: 1s; animation-timing-function: ease-out; animation-delay: 0; animation-direction: alternate; animation-iteration-count: infinite; animation-fill-mode: forwards; animation-play-state: running;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ring";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: -1;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		hs+='transform: rotateX(65deg); animation: pulse 2s infinite ease-out;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ring.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ring.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.hasVR() == true)) || 
				((player.isInVR() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ring.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ring.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ring.style[domTransition]='';
				if (me._ring.ggCurrentLogicStateVisible == 0) {
					me._ring.style.visibility="hidden";
					me._ring.ggVisible=false;
				}
				else {
					me._ring.style.visibility=(Number(me._ring.style.opacity)>0||!me._ring.style.opacity)?'inherit':'hidden';
					me._ring.ggVisible=true;
				}
			}
		}
		me._ring.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._ht_ring.appendChild(me._ring);
		el=me._pin_node_ico=document.createElement('div');
		els=me._pin_node_ico__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA0OS4zIDY0Ij4KIDxwYXRoIGZpbGw9IiMyNTNkOGYiIGZpbGwtb3BhY2l0eT0iMSIgZD0iTTI0LjcuOEEyMy41LDIzLjUsMCwwLDAsMS4yLDI0LjJjMCwxMi45LDIzLjUsMzksMjMuNSwzOXMyMy40LTI2LjEsMjMuNC0zOUEyMy40LDIzLjQsMCwwLDAsMjQuNy44Wm0wLDQ0LjJBMjEuMywyMS4zLDAsMSwxLDQ1LjksMjMuNywyMS4zLDIxLjMsMCwwLDEsMjQuNyw0NVoiLz4KPC9zdmc+Cg==';
		me._pin_node_ico__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="pin_node_ico";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: -1;';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 64px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pin_node_ico.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._pin_node_ico.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.hasVR() == true)) || 
				((player.isInVR() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._pin_node_ico.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._pin_node_ico.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._pin_node_ico.style[domTransition]='';
				if (me._pin_node_ico.ggCurrentLogicStateVisible == 0) {
					me._pin_node_ico.style.visibility="hidden";
					me._pin_node_ico.ggVisible=false;
				}
				else {
					me._pin_node_ico.style.visibility=(Number(me._pin_node_ico.style.opacity)>0||!me._pin_node_ico.style.opacity)?'inherit':'hidden';
					me._pin_node_ico.ggVisible=true;
				}
			}
		}
		me._pin_node_ico.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hs_logo=document.createElement('div');
		els=me._hs_logo__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODEuOTcgMzc5LjEyIj4KIDxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgIDxwYXRoIGZpbGw9IiNmM2RiN2UiIGQ9Ik0zODIsMTg5LjU1YzAsMTA0LjctODUuNTEsMTg5LjU3LTE5MSwxODkuNTdTMCwyOTQuMjUsMCwxODkuNTUsODUuNSwwLDE5MSwwLDM4Miw4NC44NywzODIsMTg5LjU1WiIvPgogICA8cGF0aCBmaWxsPSIjMGE2YmFkIiBkPSJNMjYyLjQ4LDIyNC41N2MtMjUuNi0xMS4wNi0yMS4wNS0zMi'+
			'43OC0yMC4yNC0zNS45LDcuMTUtMjUuMzQsMzguNzItNTUuODQsNzUuMzEtNzAuMjEtMjkuNzQtMjEuNTMtNjAuMDcsMi40NC02MC4wNywyLjQ0czUuNzUtNy4yNCwyOC4wNi0xNi43OGMtMjAuODUsMi41NC00MS40OCwxMC4yMy01Ni44NSwzMC4zMi0xNy4wOCwyMi4yOS0xMC4xNiw1MS43Ni0yLjMxLDcxLjE0LTE2Ljg5LTEyLjcxLTI4LjQ1LTI5LjkzLTQyLTU5LjEtMzAuOTUtNzEuODUtMTM3LTQ0LjQxLTEzNy00NC40MXM1OS4wOSwyLjY4LDgyLjk1LDQ5LjE5YzM1LjMzLDY4LjkyLDc5LjE0LDczLjI2LDc5LjE0LDczLjI2LTQ3LjIxLTMuMTQtNTIuODEsMzAuMzItNTIuODEsMzAuMzJzMTQu'+
			'MjctNC41MSwyOC4zOC0yLjEyYzQxLjEsNyw3Ni43OC0yMC40LDgxLjY5LTI1LjU3LjA5LS4wOS4xNi0uMTguMjQtLjI3YTIuMiwyLjIsMCwwLDAsLjM0LS40NkMyNjUuNjUsMjI1LjgsMjY0LjA1LDIyNS4xOSwyNjIuNDgsMjI0LjU3WiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMDcuMjEsMjkzLjUxYy4yNy0uNzEuNDYtMS4xNS41OS0xLjU5LDEuMTYtMy44NCwyLjM1LTcuNjcsMy40NC0xMS41Mi4zLTEuMTEuNzYtMS42MiwyLTEuNTcsMi40Mi4xLDQuODUsMCw3LjI1LDAsLjc3LDAsMS4zLjEsMS4zLDEuMTFxMCwxMywwLDI2LjE0YTMuMTcsMy'+
			'4xNywwLDAsMS0uMTEuNjFIMTE0di0xM2wtLjI1LS4wOGMtLjE4LjU2LS40MSwxLjExLS41NiwxLjY4LS45NCwzLjM5LTEuODksNi43OC0yLjc2LDEwLjE5LS4yNiwxLS42NiwxLjM5LTEuNzIsMS4yOC0xLjQxLS4xMy0zLjI0LjQtNC4xNi0uM3MtMS0yLjU0LTEuMzUtMy44OXEtMS4xNy00LjA5LTIuMzEtOC4xOWExLDEsMCwwLDAtLjQ4LS42OHYxMi45M0g5Mi42OWMwLS40Ny0uMDgtLjg5LS4wOC0xLjMxLDAtOC4zMiwwLTE2LjY1LDAtMjUsMC0xLjIxLjMyLTEuNjMsMS41Ny0xLjU5LDIuMzcuMDcsNC43NC4wOCw3LjEyLDAsMS4xNSwwLDEuNTguNDMsMS44OCwxLjQ4LDEuMTIsMy44NiwyLjMy'+
			'LDcuNjgsMy41LDExLjVDMTA2Ljc5LDI5Mi4yOSwxMDcsMjkyLjcyLDEwNy4yMSwyOTMuNTFaIi8+CiAgIDxwYXRoIGZpbGw9IiNkOTI3MjgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE0NC4xMiwzMDYuNzlWMjg4LjY3YzAtMi44NCwwLTUuNjgsMC04LjUyLDAtLjY3LDAtMS4zMS45My0xLjI4LDQuMzQuMTQsOC43MS0uMDgsMTMsLjQ3YTExLjkyLDExLjkyLDAsMCwxLDEwLjIxLDExLjQ1LDIwLDIwLDAsMCwxLS45NCw4LjI2Yy0xLjksNS4wOS01LjkzLDcuMzItMTEuMDUsNy42N0MxNTIuMjksMzA3LDE0OC4yOSwzMDYuNzksMTQ0LjEyLDMwNi43OVptMTAtMjAuNDljLS42OC4wNy0xLjU5LS'+
			'4yOS0xLjU3LDEuMDUsMCwzLjUyLDAsNywwLDEwLjU2LDAsLjM0LjQ0LDEsLjcsMSwzLjE5LjE3LDUuNjgtLjU0LDYuNDMtMy45M2ExMS4zLDExLjMsMCwwLDAsLjEyLTMuNzZDMTU5LjQsMjg3Ljg2LDE1Ny41NSwyODYuMzQsMTU0LjExLDI4Ni4zWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yODguMzksMjkwLjM2Yy0yLjYzLDAtNS4xOSwwLTcuNzQsMC0uMzMsMC0uNzYtLjUtLjk1LS44Ny0xLjQ5LTIuODktMy44MS00LjA5LTYuNzQtMy40NGE2LjI2LDYuMjYsMCwwLDAtNC42MSw2LjEyLDEwLDEwLDAsMCwwLC44NCwzLjkzLDUuMzgsNS4zOCww'+
			'LDAsMCw0Ljg2LDMuMjgsNS4yOCw1LjI4LDAsMCwwLDUuMzEtMywyLjI2LDIuMjYsMCwwLDEsMi40NS0xLjM1YzIuMTYuMDgsNC4zMiwwLDYuNDQsMCwuNzgsNC44Ny01LjcxLDExLjEtMTIuMDUsMTEuNzhhMTQuNDUsMTQuNDUsMCwwLDEtMTYuMy0xMy40OCwxNC4yMSwxNC4yMSwwLDAsMSwxMy41My0xNC44N0MyODEuMzMsMjc4LjIzLDI4OC41LDI4My44MSwyODguMzksMjkwLjM2WiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMTcuNDUsMzA2LjgxYy0yLjc4LDAtNS40OS4wNS04LjE5LDAtLjM1LDAtLjg0LS41Ni0xLTEtMS4wOS0zLjExLTEuMD'+
			'ctMy4xMS00LjM1LTMuMTFoLS40NGMtMS4yNCwwLTIuNzQtLjQtMy42My4xN3MtLjk0LDIuMDgtMS40OCwzLjE1YTEuNSwxLjUsMCwwLDEtMSwuNzhjLTIuNjUuMDYtNS4zMSwwLTguMiwwbDEuMTEtMi44NWMzLjE0LTcuOTEsNi4yOS0xNS44MSw5LjM5LTIzLjc0YTEuNzgsMS43OCwwLDAsMSwyLTEuMzljMS4yOC4wOSwyLjU4LS4wNiwzLjg1LjA2YTIsMiwwLDAsMSwxLjQxLjg5YzMuNDksOC43Miw2LjkxLDE3LjQ3LDEwLjM0LDI2LjIxQTUuNzUsNS43NSwwLDAsMSwyMTcuNDUsMzA2LjgxWm0tMTMuODQtMTUuNjNoLS4zNmwtMS4zNyw0LjVoMy4wNloiLz4KICAgPHBhdGggZmlsbD0iI2Q5Mjcy'+
			'OCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTMzLjE1LDI4OC43Mmg3LjUydjcuNDVoLTcuNTV2Mi43NWg3Ljc5djcuOEgxMjVjMC0uNC0uMDktLjgyLS4wOS0xLjI0LDAtOC4zNywwLTE2Ljc2LDAtMjUuMTEsMC0xLjE1LjMyLTEuNTQsMS40OC0xLjUzLDQuMzkuMDUsOC43OCwwLDEzLjE3LDAsMS4wOSwwLDEuNjIuMjQsMS41NSwxLjQ3LS4xMSwxLjkxLDAsMy44MSwwLDZoLTYuMDlDMTMyLjg1LDI4Ni4zLDEzMi44NSwyODYuMywxMzMuMTUsMjg4LjcyWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNDEuNTQsMzA2LjgyYzAtLjY2LS4wOC0xLj'+
			'E2LS4wOC0xLjYzLDAtOC4yMiwwLTE2LjQ0LDAtMjQuNjYsMC0xLjI1LjMxLTEuNzMsMS42NC0xLjY5LDQuMjkuMDcsOC41OS4wNSwxMi44NywwLDEuMjIsMCwxLjY4LjQsMS42MiwxLjYxYTM4LDM4LDAsMCwwLDAsNC4yN2MuMSwxLjMzLS40NiwxLjY3LTEuNzEsMS42MS0xLjY4LS4xMS0zLjM2LDAtNSwwLS44NSwwLTEuMzguMTMtMS4zOSwxLjE3cy41MywxLjI4LDEuNDYsMS4yNWMxLjY3LDAsMy4zNS4wNiw1LDAsMS4wNi0uMDUsMS4zOS4zNSwxLjM2LDEuMzUtLjA1LDEuNi0uMDUsMy4yMywwLDQuODUsMCwxLS4zLDEuMzgtMS4zNiwxLjMzLTIuMDUtLjA4LTQuMTIsMC02LjE1LDAtLjc0LDIu'+
			'MzQtLjQ5LDIuNzMsMS43NiwyLjczLDEuNjIsMCwzLjI1LDAsNC44NywwLC44MSwwLDEuMTcuMjksMS4xNiwxLjEsMCwxLjksMCwzLjgyLDAsNS43MywwLC43MS0uMjUsMS4wNi0xLDEuMDZDMjUxLjU4LDMwNi44LDI0Ni42NiwzMDYuODIsMjQxLjU0LDMwNi44MloiLz4KICAgPHBhdGggZmlsbD0iI2Q5MjcyOCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjIxLjY3LDMwNi43MVYyODguNTNjMC0yLjIzLDAtMi4yMy0yLjIyLTIuMjNoLTUuMzd2LTcuMjNIMjM4LjZ2Ny4yM2MtMS44OCwwLTMuNzguMDctNS42NywwLTEuNDYtLjA4LTIsLjMxLTEuOTMsMS44NS4wOSw1LjYyLDAsMTEuMjYsMCwxNi'+
			'44OHYxLjcxWiIvPgogICA8cGF0aCBmaWxsPSIjZDkyNzI4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xODYuODQsMjk5djcuNzdhNS43OSw1Ljc5LDAsMCwxLS43Ni4wOGMtNC42MywwLTkuMjYsMC0xMy45MSwwLTEsMC0xLjMtLjMxLTEuMy0xLjI2LDAtOC40NywwLTE2LjkyLDAtMjUuNCwwLTEuMDUuNDgtMS4zNSwxLjQ0LTEuMzIsMS44NywwLDMuNzQsMCw1LjYyLDAsMS4wNi0uMDUsMS4zMS40MiwxLjMxLDEuMzksMCw1LjY4LDAsMTEuMzYtLjA1LDE3LDAsMS40LjQ3LDEuNzYsMS43OCwxLjdDMTgyLjg3LDI5OC44OSwxODQuOCwyOTksMTg2Ljg0LDI5OVoiLz4KICA8L2c+CiA8L2c+Cjwv'+
			'c3ZnPgo=';
		me._hs_logo__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_logo";
		el.ggDx=0;
		el.ggDy=-8;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 43px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 43px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_logo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_logo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._pin_node_ico.appendChild(me._hs_logo);
		me._ht_ring.appendChild(me._pin_node_ico);
		el=me._tt_ht_ring_a=document.createElement('div');
		els=me._tt_ht_ring_a__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_ring_a";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 22px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 160px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #253d8f;';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 6px;';
		hs+=cssPrefix + 'border-radius: 6px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 14px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 6px 7px 6px 7px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_ring_a.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_ring_a.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((me.elementMouseOver['ht_ring'] == true)) || 
				((player.getIsMobile() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_ring_a.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_ring_a.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_ht_ring_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_ring_a.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_ht_ring_a.style.bottom='75px';
					me._tt_ht_ring_a.ggUpdatePosition(true);
				}
				else {
					me._tt_ht_ring_a.ggDx=1;
					me._tt_ht_ring_a.style.bottom='22px';
					me._tt_ht_ring_a.ggUpdatePosition(true);
				}
			}
		}
		me._tt_ht_ring_a.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true)) || 
				((me.elementMouseOver['ht_ring'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._tt_ht_ring_a.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._tt_ht_ring_a.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._tt_ht_ring_a.style[domTransition]='left 500ms ease 0ms, bottom 500ms ease 0ms, opacity 500ms ease 0ms';
				if (me._tt_ht_ring_a.ggCurrentLogicStateAlpha == 0) {
					me._tt_ht_ring_a.style.visibility=me._tt_ht_ring_a.ggVisible?'inherit':'hidden';
					me._tt_ht_ring_a.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._tt_ht_ring_a.style.opacity == 0.0) { me._tt_ht_ring_a.style.visibility="hidden"; } }, 505);
					me._tt_ht_ring_a.style.opacity=0;
				}
			}
		}
		me._tt_ht_ring_a.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((166-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_ring.appendChild(me._tt_ht_ring_a);
		el=me._ex_ring=document.createElement('div');
		els=me._ex_ring__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ex_ring.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Ex_ring";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 64px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 64px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ex_ring.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ex_ring.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.hasVR() == true)) || 
				((player.isInVR() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ex_ring.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ex_ring.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ex_ring.style[domTransition]='';
				if (me._ex_ring.ggCurrentLogicStateVisible == 0) {
					me._ex_ring.style.visibility=(Number(me._ex_ring.style.opacity)>0||!me._ex_ring.style.opacity)?'inherit':'hidden';
					me._ex_ring.ggSubElement.src=me._ex_ring.ggText;
					me._ex_ring.ggVisible=true;
				}
				else {
					me._ex_ring.style.visibility="hidden";
					me._ex_ring__img.src = '';
					me._ex_ring.ggVisible=false;
				}
			}
		}
		me._ex_ring.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ex_ring.clientWidth;
			var parentHeight = me._ex_ring.clientHeight;
			var img = me._ex_ring__img;
			var aspectRatioDiv = me._ex_ring.clientWidth / me._ex_ring.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_ring.appendChild(me._ex_ring);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_ring;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='hs_info') {
			hotspot.skinid = 'hs_info';
			hsinst = new SkinHotspotClass_hs_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='callout_m') {
			hotspot.skinid = 'callout_m';
			hsinst = new SkinHotspotClass_callout_m(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_callout_m_configloaded();;
		} else
		if (hotspot.skinid=='ht_node_fun') {
			hotspot.skinid = 'ht_node_fun';
			hsinst = new SkinHotspotClass_ht_node_fun(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_fun_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_fun_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_fun_varchanged_ht_colour();;
		} else
		if (hotspot.skinid=='ht_arrow') {
			hotspot.skinid = 'ht_arrow';
			hsinst = new SkinHotspotClass_ht_arrow(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_arrow_changenode();;
			me.callChildLogicBlocksHotspot_ht_arrow_configloaded();;
			me.callChildLogicBlocksHotspot_ht_arrow_mouseover();;
			me.callChildLogicBlocksHotspot_ht_arrow_activehotspotchanged();;
		} else
		if (hotspot.skinid=='ht_info_c') {
			hotspot.skinid = 'ht_info_c';
			hsinst = new SkinHotspotClass_ht_info_c(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_c_changenode();;
			me.callChildLogicBlocksHotspot_ht_info_c_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_c_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_info_c_varchanged_var_hs();;
		} else
		if (hotspot.skinid=='ht_info_b') {
			hotspot.skinid = 'ht_info_b';
			hsinst = new SkinHotspotClass_ht_info_b(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_b_changenode();;
			me.callChildLogicBlocksHotspot_ht_info_b_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_b_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_info_b_varchanged_var_hs();;
		} else
		if (hotspot.skinid=='ht_node_a') {
			hotspot.skinid = 'ht_node_a';
			hsinst = new SkinHotspotClass_ht_node_a(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_a_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_a_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_a_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_a_active();;
			me.callChildLogicBlocksHotspot_ht_node_a_changevisitednodes();;
			me.callChildLogicBlocksHotspot_ht_node_a_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_node_a_varchanged_var_hs();;
		} else
		{
			hotspot.skinid = 'ht_ring';
			hsinst = new SkinHotspotClass_ht_ring(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_ring_configloaded();;
			me.callChildLogicBlocksHotspot_ht_ring_mouseover();;
			me.callChildLogicBlocksHotspot_ht_ring_vrchanged();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['hs_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['hs_info'].length; i++) {
				hotspotTemplates['hs_info'][i] = null;
			}
		}
		if(hotspotTemplates['callout_m']) {
			var i;
			for(i = 0; i < hotspotTemplates['callout_m'].length; i++) {
				hotspotTemplates['callout_m'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node_fun']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_fun'].length; i++) {
				hotspotTemplates['ht_node_fun'][i] = null;
			}
		}
		if(hotspotTemplates['ht_arrow']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_arrow'].length; i++) {
				hotspotTemplates['ht_arrow'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_c']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_c'].length; i++) {
				hotspotTemplates['ht_info_c'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info_b']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info_b'].length; i++) {
				hotspotTemplates['ht_info_b'][i] = null;
			}
		}
		if(hotspotTemplates['ht_node_a']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node_a'].length; i++) {
				hotspotTemplates['ht_node_a'][i] = null;
			}
		}
		if(hotspotTemplates['ht_ring']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_ring'].length; i++) {
				hotspotTemplates['ht_ring'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinElement_map_pin_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._map_pin=document.createElement('div');
		el.ggId="map_pin";
		el.ggDx=-124;
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.1,sy:0.1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 610px;';
		hs+='height : 36px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 36px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._map_pin.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._map_pin.onclick=function (e) {
			if (
				(
					((me._map_pin.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
			if (
				(
					((player.getIsMobile() == true)) && 
					((player.getViewerSize().width < 720))
				)
			) {
				player.setVariableValue('map_hide', true);
			}
		}
		me._map_pin.onmouseover=function (e) {
			me.elementMouseOver['map_pin']=true;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.onmouseout=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ontouchend=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ggUpdatePosition=function (useTransition) {
		}
		me._map_pin.ggNodeChange=function () {
			player.setVariableValue('map_scale_full', false);
		}
		el=me._map_pin_active=document.createElement('div');
		els=me._map_pin_active__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBkYXRhLW5hbWU9ImxvY2F0aW9uIGFjdGl2ZSIgaWQ9ImxvY2F0aW9uX2FjdGl2ZSI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMwLjIuMUEyNC44LDI0LjgsMCwwLDAsMTMuNCw4LjgsMjQuMiwyNC4yLDAsMCwwLDguNCwyOSwyMy42LDIzLjYsMCwwLDAsMTMsMzguOWw4LjYsMTIuMyw4LjIsMTEuN2EyLjksMi45LDAsMCwwLDMuOC42Yy40LS4yLDIuOC0zLjcsOC45LTEyLjQsNC42LTYuNiw4LjctMTIuNSw5LjItMTMuMU'+
			'EyNC42LDI0LjYsMCwwLDAsNTYsMjJhMjQuOSwyNC45LDAsMCwwLTIuMi04LjJBMjQuMSwyNC4xLDAsMCwwLDM2LjMuNSw0NCw0NCwwLDAsMCwzMS44LDBaIi8+CiAgPHBhdGggZmlsbD0iI2VmOGYyMiIgZD0iTTU0LjQsMjIuN0EyMi42LDIyLjYsMCwwLDAsNTIuMywxNSwyMi44LDIyLjgsMCwwLDAsMzYsMi42bC00LjItLjRIMzAuM0EyMi41LDIyLjUsMCwwLDAsMTAsMjkuMmEyMS42LDIxLjYsMCwwLDAsNC4zLDkuMmw4LDExLjUsNy42LDEwLjlhMi44LDIuOCwwLDAsMCwzLjYuNWMuMy0uMiwyLjYtMy4zLDguMy0xMS41bDguNS0xMi4yQTIyLjcsMjIuNywwLDAsMCw1NC40LDIyLjdaTTM4Ljks'+
			'MzMuOWExMy4zLDEzLjMsMCwwLDEtNS42LDIuNCwxMiwxMiwwLDAsMS0xMy40LTEwLDE3LjgsMTcuOCwwLDAsMSwuMy00LjZBMTIsMTIsMCwwLDEsMjkuNiwxM2ExNi4xLDE2LjEsMCwwLDEsNC45LjIsMTEuOSwxMS45LDAsMCwxLDcuOCw2LjQsMTIuNSwxMi41LDAsMCwxLDEuMSwzLjlBMTIuMSwxMi4xLDAsMCwxLDM4LjksMzMuOVoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._map_pin_active__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_active";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 36px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 36px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_pin_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_active.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_active'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else if (
				((me._map_pin_active.ggIsActive() == true))
			)
			{
				newLogicStateScaling = 1;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_active.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateScaling == 0) {
					me._map_pin_active.ggParameter.sx = 1.3;
					me._map_pin_active.ggParameter.sy = 1.3;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
				else if (me._map_pin_active.ggCurrentLogicStateScaling == 1) {
					me._map_pin_active.ggParameter.sx = 1.1;
					me._map_pin_active.ggParameter.sy = 1.1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
				else {
					me._map_pin_active.ggParameter.sx = 1;
					me._map_pin_active.ggParameter.sy = 1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
			}
		}
		me._map_pin_active.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_active.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_active.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_active.style.visibility=me._map_pin_active.ggVisible?'inherit':'hidden';
					me._map_pin_active.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_active.style.opacity == 0.0) { me._map_pin_active.style.visibility="hidden"; } }, 505);
					me._map_pin_active.style.opacity=0;
				}
			}
		}
		me._map_pin_active.onmouseover=function (e) {
			me.elementMouseOver['map_pin_active']=true;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.onmouseout=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ontouchend=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_active);
		el=me._map_pin_normal=document.createElement('div');
		els=me._map_pin_normal__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8ZyBkYXRhLW5hbWU9ImxvY2F0aW9uIG5vcm1hbCIgaWQ9ImxvY2F0aW9uX25vcm1hbCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMwLjIuMUEyNC44LDI0LjgsMCwwLDAsMTMuNCw4LjgsMjQuMiwyNC4yLDAsMCwwLDguNCwyOSwyMy42LDIzLjYsMCwwLDAsMTMsMzguOWw4LjYsMTIuMyw4LjIsMTEuN2EyLjksMi45LDAsMCwwLDMuOC42Yy40LS4yLDIuOC0zLjcsOC45LTEyLjQsNC42LTYuNiw4LjctMTIuNSw5LjItMTMuMU'+
			'EyNC42LDI0LjYsMCwwLDAsNTYsMjJhMjQuOSwyNC45LDAsMCwwLTIuMi04LjJBMjQuMSwyNC4xLDAsMCwwLDM2LjMuNSw0NCw0NCwwLDAsMCwzMS44LDBaIi8+CiAgPHBhdGggZmlsbD0iIzI1M2Q4ZiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNNTQuNCwyMi43QTIyLjYsMjIuNiwwLDAsMCw1Mi4zLDE1LDIyLjgsMjIuOCwwLDAsMCwzNiwyLjZsLTQuMi0uNEgzMC4zQTIyLjUsMjIuNSwwLDAsMCwxMCwyOS4yYTIxLjYsMjEuNiwwLDAsMCw0LjMsOS4ybDgsMTEuNSw3LjYsMTAuOWEyLjgsMi44LDAsMCwwLDMuNi41Yy4zLS4yLDIuNi0zLjMsOC4zLTExLjVsOC41LTEyLjJBMjIuNywyMi43LDAsMCww'+
			'LDU0LjQsMjIuN1pNMzguOSwzMy45YTEzLjMsMTMuMywwLDAsMS01LjYsMi40LDEyLDEyLDAsMCwxLTEzLjQtMTAsMTcuOCwxNy44LDAsMCwxLC4zLTQuNkExMiwxMiwwLDAsMSwyOS42LDEzYTE2LjEsMTYuMSwwLDAsMSw0LjkuMiwxMS45LDExLjksMCwwLDEsNy44LDYuNCwxMi41LDEyLjUsMCwwLDEsMS4xLDMuOUExMi4xLDEyLjEsMCwwLDEsMzguOSwzMy45WiIvPgogPC9nPgo8L3N2Zz4K';
		me._map_pin_normal__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_normal";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_pin_normal.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_normal.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_normal'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_normal.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateScaling == 0) {
					me._map_pin_normal.ggParameter.sx = 1.3;
					me._map_pin_normal.ggParameter.sy = 1.3;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
				else {
					me._map_pin_normal.ggParameter.sx = 1;
					me._map_pin_normal.ggParameter.sy = 1;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
			}
		}
		me._map_pin_normal.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_normal.ggIsActive() == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_normal.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_normal.style.visibility=me._map_pin_normal.ggVisible?'inherit':'hidden';
					me._map_pin_normal.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_normal.style.opacity == 0.0) { me._map_pin_normal.style.visibility="hidden"; } }, 505);
					me._map_pin_normal.style.opacity=0;
				}
			}
		}
		me._map_pin_normal.onmouseover=function (e) {
			me.elementMouseOver['map_pin_normal']=true;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.onmouseout=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ontouchend=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_normal);
		el=me._map_pin_tt=document.createElement('div');
		els=me._map_pin_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="map_pin_tt";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 32px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 120px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #4b4b4b;';
		hs+='background: rgba(75,75,75,0.705882);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 3px 0px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._map_pin_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_tt.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._map_pin_tt.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._map_pin_tt.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._map_pin_tt.style.bottom='-38px';
					me._map_pin_tt.ggUpdatePosition(true);
				}
				else {
					me._map_pin_tt.ggDx=0;
					me._map_pin_tt.style.bottom='32px';
					me._map_pin_tt.ggUpdatePosition(true);
				}
			}
		}
		me._map_pin_tt.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['map_pin'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_tt.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_tt.style[domTransition]='left 0s, bottom 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_tt.style.visibility=me._map_pin_tt.ggVisible?'inherit':'hidden';
					me._map_pin_tt.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_tt.style.opacity == 0.0) { me._map_pin_tt.style.visibility="hidden"; } }, 505);
					me._map_pin_tt.style.opacity=0;
				}
			}
		}
		me._map_pin_tt.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_tt);
	};
	function SkinCloner_cloner_next_area_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 220px; height: 72px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._arrow_next_area=document.createElement('div');
		els=me._arrow_next_area__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyOC40IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIwLjM1Ii8+CiA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzQuMywyMC4zYTEuNywxLjcsMCwwLDAtLjgsMS4yYy0uMy45LS4yLjksMy44LDVMNDEsMzAuMkgyOS41Yy0xMS40LjEtMTEuNS4xLTExLjguM2ExLjgsMS44LDAsMCwwLDAsM2MuMy4yLjQuMiwxMS45LjNINDEuMWwtMy43LDMuN2E0MS45LDQxLjksMCwwLDAtMy44LDQsMS'+
			'44LDEuOCwwLDAsMCwxLjIsMi40Yy45LjIuOC4zLDYuNy01LjVMNDcsMzIuOGEyLjIsMi4yLDAsMCwwLDAtMS42Yy0uMi0uNC0xMC0xMC4zLTEwLjctMTAuOEEyLDIsMCwwLDAsMzQuMywyMC4zWiIvPgo8L3N2Zz4K';
		me._arrow_next_area__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._arrow_next_area__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMC40IiBmaWxsPSIjMDEwMTAxIi8+CiA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzQuNSwxOS41YTEuNiwxLjYsMCwwLDAtLjksMS4yYy0uMywxLS4yLDEsNC4xLDUuNGw0LDMuOUgyOS40Yy0xMi4zLjEtMTIuNC4xLTEyLjcuM2ExLjksMS45LDAsMCwwLDAsMy4yYy4zLjIuNC4yLDEyLjcuM0g0MS43bC0zLjksNGMtMi4yLDIuMS00LDQuMS00LjEsNC4yQTEuOSwxLjksMCwwLDAsMz'+
			'UsNDQuN2MxLC4zLjkuNCw3LjEtNS44bDYtNi4xYTIuMiwyLjIsMCwwLDAtLjEtMS42Yy0uMi0uNS0xMC42LTExLTExLjQtMTEuNkEyLjIsMi4yLDAsMCwwLDM0LjUsMTkuNVoiLz4KPC9zdmc+Cg==';
		me._arrow_next_area__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="arrow_next_area";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._arrow_next_area.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._arrow_next_area.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._arrow_next_area.onmouseover=function (e) {
			player.setVariableValue('tooltip_hover', true);
			if (
				(
					((player.getVariableValue('tran_en') == false))
				)
			) {
				skin._tooltip.ggText="\u0110i\u1ec3m K\u1ebf Ti\u1ebfp";
				skin._tooltip.ggTextDiv.innerHTML=skin._tooltip.ggText;
				if (skin._tooltip.ggUpdateText) {
					skin._tooltip.ggUpdateText=function() {
						var hs="\u0110i\u1ec3m K\u1ebf Ti\u1ebfp";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._tooltip.ggUpdatePosition) {
					skin._tooltip.ggUpdatePosition();
				}
				skin._tooltip.ggTextDiv.scrollTop = 0;
			}
			if (
				(
					((player.getVariableValue('tran_en') == true))
				)
			) {
				skin._tooltip.ggText="Next Panorama";
				skin._tooltip.ggTextDiv.innerHTML=skin._tooltip.ggText;
				if (skin._tooltip.ggUpdateText) {
					skin._tooltip.ggUpdateText=function() {
						var hs="Next Panorama";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
				}
				if (skin._tooltip.ggUpdatePosition) {
					skin._tooltip.ggUpdatePosition();
				}
				skin._tooltip.ggTextDiv.scrollTop = 0;
			}
			me._arrow_next_area__img.style.visibility='hidden';
			me._arrow_next_area__imgo.style.visibility='inherit';
		}
		me._arrow_next_area.onmouseout=function (e) {
			player.setVariableValue('tooltip_hover', false);
			skin._tooltip.ggText="";
			skin._tooltip.ggTextDiv.innerHTML=skin._tooltip.ggText;
			if (skin._tooltip.ggUpdateText) {
				skin._tooltip.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._tooltip.ggUpdatePosition) {
				skin._tooltip.ggUpdatePosition();
			}
			skin._tooltip.ggTextDiv.scrollTop = 0;
			me._arrow_next_area__img.style.visibility='inherit';
			me._arrow_next_area__imgo.style.visibility='hidden';
		}
		me._arrow_next_area.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._arrow_next_area);
		el=me._bg_tt_next_area=document.createElement('div');
		el.ggId="bg_tt_next_area";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.235294);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 72px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		hs+='filter: blur(20px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._bg_tt_next_area.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._bg_tt_next_area.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width < 480))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._bg_tt_next_area.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._bg_tt_next_area.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._bg_tt_next_area.style[domTransition]='opacity 0s';
				if (me._bg_tt_next_area.ggCurrentLogicStateAlpha == 0) {
					me._bg_tt_next_area.style.visibility="hidden";
					me._bg_tt_next_area.style.opacity=0;
				}
				else {
					me._bg_tt_next_area.style.visibility=me._bg_tt_next_area.ggVisible?'inherit':'hidden';
					me._bg_tt_next_area.style.opacity=1;
				}
			}
		}
		me._bg_tt_next_area.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._bg_tt_next_area);
		el=me._tt_next_area=document.createElement('div');
		els=me._tt_next_area__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_next_area";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 72px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 2px 2px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 180px;';
		hs+='height: 72px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 16px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 10px 11px 10px 11px;';
		hs+='overflow: hidden;';
		hs+="display: flex; justify-content: center; align-items: center;";
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.description+":<br\/>"+me.ggUserdata.title;
		el.appendChild(els);
		me._tt_next_area.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_next_area.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getIsMobile() == true)) && 
				((player.getViewerSize().width / player.getViewerSize().height < 1)) && 
				((player.getViewerSize().width < 480))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._tt_next_area.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._tt_next_area.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._tt_next_area.style[domTransition]='opacity 0s';
				if (me._tt_next_area.ggCurrentLogicStateAlpha == 0) {
					me._tt_next_area.style.visibility="hidden";
					me._tt_next_area.style.opacity=0;
				}
				else {
					me._tt_next_area.style.visibility=me._tt_next_area.ggVisible?'inherit':'hidden';
					me._tt_next_area.style.opacity=1;
				}
			}
		}
		me._tt_next_area.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((me.ggUserdata.description == ""))
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_next_area.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_next_area.ggCurrentLogicStateText = newLogicStateText;
				me._tt_next_area.style[domTransition]='opacity 0s';
				if (me._tt_next_area.ggCurrentLogicStateText == 0) {
					me._tt_next_area.ggText="Next";
					me._tt_next_area__text.innerHTML=me._tt_next_area.ggText;
					if (me._tt_next_area.ggUpdateText) {
					me._tt_next_area.ggUpdateText=function() {
						var hs="Next";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_next_area.ggUpdatePosition) me._tt_next_area.ggUpdatePosition();
					}
				}
				else if (me._tt_next_area.ggCurrentLogicStateText == 1) {
					me._tt_next_area.ggText=me.ggUserdata.title;
					me._tt_next_area__text.innerHTML=me._tt_next_area.ggText;
					if (me._tt_next_area.ggUpdateText) {
					me._tt_next_area.ggUpdateText=function() {
						var hs=me.ggUserdata.title;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_next_area.ggUpdatePosition) me._tt_next_area.ggUpdatePosition();
					}
				}
				else {
					me._tt_next_area.ggText=me.ggUserdata.description+":\n"+me.ggUserdata.title;
					me._tt_next_area__text.innerHTML=me._tt_next_area.ggText;
					if (me._tt_next_area.ggUpdateText) {
					me._tt_next_area.ggUpdateText=function() {
						var hs=me.ggUserdata.description+":\n"+me.ggUserdata.title;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_next_area.ggUpdatePosition) me._tt_next_area.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_next_area.onclick=function (e) {
			if (
				(
					((me.ggUserdata.tags.indexOf("1") != -1))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._tt_next_area.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._tt_next_area);
	};
	function SkinCloner_cloner_area_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 220px; height: 60px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._area_w=document.createElement('div');
		el.ggId="area_w";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 50px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 1px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._area_w.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._area_w.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._area_w);
		el=me._tt_area_list=document.createElement('div');
		els=me._tt_area_list__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_area_list";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text test_tt";
		el.ggType='text';
		hs ='';
		hs+='height : 60px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 0px 0px 1px #adadad';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 60px;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.658824);';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 15px;';
		hs+=cssPrefix + 'border-radius: 15px;';
		hs+='color: rgba(37,61,143,1);';
		hs+='font-size: 19px;';
		hs+='font-weight: 700;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 16px 17px 16px 17px;';
		hs+='overflow: hidden;';
		hs+="padding-left: 15px; display: flex; justify-content: start; align-items: center;";
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle;
		el.appendChild(els);
		me._tt_area_list.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_area_list.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me._tt_area_list.ggIsActive() == false))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._tt_area_list.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._tt_area_list.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._tt_area_list.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, color 0s';
				if (me._tt_area_list.ggCurrentLogicStateScaling == 0) {
					me._tt_area_list.ggParameter.sx = 0.8;
					me._tt_area_list.ggParameter.sy = 0.8;
					me._tt_area_list.style[domTransform]=parameterToTransform(me._tt_area_list.ggParameter);
				}
				else {
					me._tt_area_list.ggParameter.sx = 1;
					me._tt_area_list.ggParameter.sy = 1;
					me._tt_area_list.style[domTransform]=parameterToTransform(me._tt_area_list.ggParameter);
				}
			}
		}
		me._tt_area_list.logicBlock_textcolor = function() {
			var newLogicStateTextColor;
			if (
				((me._tt_area_list.ggIsActive() == true))
			)
			{
				newLogicStateTextColor = 0;
			}
			else {
				newLogicStateTextColor = -1;
			}
			if (me._tt_area_list.ggCurrentLogicStateTextColor != newLogicStateTextColor) {
				me._tt_area_list.ggCurrentLogicStateTextColor = newLogicStateTextColor;
				me._tt_area_list__text.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, color 0s';
				if (me._tt_area_list.ggCurrentLogicStateTextColor == 0) {
					me._tt_area_list__text.style.color="rgba(255,170,0,1)";
				}
				else {
					me._tt_area_list__text.style.color="rgba(37,61,143,1)";
				}
			}
		}
		me._tt_area_list.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._tt_area_list);
		el=me._area_active=document.createElement('div');
		el.ggId="area_active";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 60px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._area_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._area_active.onmouseover=function (e) {
			player.setVariableValue('show_menu_thumb', true);
		}
		me._area_active.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.__div.appendChild(me._area_active);
	};
	function SkinCloner_sel_floorplan_clone_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 50px; height: 30px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._sel_floorplan_button=document.createElement('div');
		els=me._sel_floorplan_button__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="sel_floorplan_button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #3e3e3e;';
		hs+='border: 1px solid #4f4f4f;';
		hs+='border-radius: 15px;';
		hs+=cssPrefix + 'border-radius: 15px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 3px 4px 3px 4px;';
		hs+='overflow: hidden;';
		hs+="padding: 5px 10px; margin: 5px 10px;";
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle;
		el.appendChild(els);
		me._sel_floorplan_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_floorplan_button.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.ggTag == "tang1")) && 
				((player.getVariableValue('map_sel') == 1))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else if (
				((me.ggTag == "tang2")) && 
				((player.getVariableValue('map_sel') == 2))
			)
			{
				newLogicStateBackgroundColor = 1;
			}
			else if (
				((me.ggTag == "tang3")) && 
				((player.getVariableValue('map_sel') == 3))
			)
			{
				newLogicStateBackgroundColor = 2;
			}
			else if (
				((me.elementMouseOver['sel_floorplan_button'] == true)) || 
				((me._sel_floorplan_button.ggIsActive() == true))
			)
			{
				newLogicStateBackgroundColor = 3;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._sel_floorplan_button__text.style[domTransition]='background-color 0s, border-color 0s, color 0s';
				if (me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor == 0) {
					me._sel_floorplan_button__text.style.backgroundColor="rgba(255,255,255,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor == 1) {
					me._sel_floorplan_button__text.style.backgroundColor="rgba(255,255,255,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor == 2) {
					me._sel_floorplan_button__text.style.backgroundColor="rgba(255,255,255,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateBackgroundColor == 3) {
					me._sel_floorplan_button__text.style.backgroundColor="rgba(255,255,255,1)";
				}
				else {
					me._sel_floorplan_button__text.style.backgroundColor="rgba(62,62,62,1)";
				}
			}
		}
		me._sel_floorplan_button.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._sel_floorplan_button.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._sel_floorplan_button.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._sel_floorplan_button.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._sel_floorplan_button__text.style[domTransition]='background-color 0s, border-color 0s, color 0s';
				if (me._sel_floorplan_button.ggCurrentLogicStateBorderColor == 0) {
					me._sel_floorplan_button__text.style.borderColor="rgba(0,255,255,1)";
				}
				else {
					me._sel_floorplan_button__text.style.borderColor="rgba(79,79,79,1)";
				}
			}
		}
		me._sel_floorplan_button.logicBlock_textcolor = function() {
			var newLogicStateTextColor;
			if (
				((me.ggTag == "tang1")) && 
				((player.getVariableValue('map_sel') == 1))
			)
			{
				newLogicStateTextColor = 0;
			}
			else if (
				((me.ggTag == "tang2")) && 
				((player.getVariableValue('map_sel') == 2))
			)
			{
				newLogicStateTextColor = 1;
			}
			else if (
				((me.ggTag == "tang3")) && 
				((player.getVariableValue('map_sel') == 3))
			)
			{
				newLogicStateTextColor = 2;
			}
			else if (
				((me.elementMouseOver['sel_floorplan_button'] == true)) || 
				((me._sel_floorplan_button.ggIsActive() == true))
			)
			{
				newLogicStateTextColor = 3;
			}
			else {
				newLogicStateTextColor = -1;
			}
			if (me._sel_floorplan_button.ggCurrentLogicStateTextColor != newLogicStateTextColor) {
				me._sel_floorplan_button.ggCurrentLogicStateTextColor = newLogicStateTextColor;
				me._sel_floorplan_button__text.style[domTransition]='background-color 0s, border-color 0s, color 0s';
				if (me._sel_floorplan_button.ggCurrentLogicStateTextColor == 0) {
					me._sel_floorplan_button__text.style.color="rgba(19,19,19,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateTextColor == 1) {
					me._sel_floorplan_button__text.style.color="rgba(19,19,19,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateTextColor == 2) {
					me._sel_floorplan_button__text.style.color="rgba(19,19,19,1)";
				}
				else if (me._sel_floorplan_button.ggCurrentLogicStateTextColor == 3) {
					me._sel_floorplan_button__text.style.color="rgba(19,19,19,1)";
				}
				else {
					me._sel_floorplan_button__text.style.color="rgba(255,255,255,1)";
				}
			}
		}
		me._sel_floorplan_button.onclick=function (e) {
			if (
				(
					((me.ggTag == "All"))
				)
			) {
				player.setVariableValue('map_sel', Number("1"));
			}
		}
		me._sel_floorplan_button.onmouseover=function (e) {
			me.elementMouseOver['sel_floorplan_button']=true;
			me._sel_floorplan_button.logicBlock_backgroundcolor();
			me._sel_floorplan_button.logicBlock_textcolor();
		}
		me._sel_floorplan_button.onmouseout=function (e) {
			if (e && e.toElement) {
				var current = e.toElement;
				while (current = current.parentNode) {
				if (current == me._sel_floorplan_button__text)
					return;
				}
			}
			me.elementMouseOver['sel_floorplan_button']=false;
			me._sel_floorplan_button.logicBlock_backgroundcolor();
			me._sel_floorplan_button.logicBlock_textcolor();
		}
		me._sel_floorplan_button.ontouchend=function (e) {
			me.elementMouseOver['sel_floorplan_button']=false;
			me._sel_floorplan_button.logicBlock_backgroundcolor();
			me._sel_floorplan_button.logicBlock_textcolor();
		}
		me._sel_floorplan_button.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._sel_floorplan_button);
	};
	function SkinCloner_sel_area_clone_Class(item, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggTag = item['tag'];
		me.ggTitle = item['title'];
		me.ggNodeCount = item['nodecount'];
		me.ggNodeId=item['firstnode'];
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 50px; height: 30px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			var tags = player.userdata.tags;
			if (tags.indexOf(me.ggTag) == -1) return false;
			for(var i=0;i<me.ggParent.ggCurrentFilter.length;i++) {
				if (tags.indexOf(me.ggParent.ggCurrentFilter[i])==-1) return false;
			}
			return true;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._sel_area_button=document.createElement('div');
		els=me._sel_area_button__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="sel_area_button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #253d8f;';
		hs+='border: 1px solid #ffaa00;';
		hs+='border-radius: 15px;';
		hs+=cssPrefix + 'border-radius: 15px;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 3px 4px 3px 4px;';
		hs+='overflow: hidden;';
		hs+="padding: 5px 10px; margin: 5px 10px;";
		els.setAttribute('style',hs);
		els.innerHTML=me.ggTitle;
		el.appendChild(els);
		me._sel_area_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._sel_area_button.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['sel_area_button'] == true)) || 
				((me._sel_area_button.ggIsActive() == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._sel_area_button.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._sel_area_button.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				me._sel_area_button__text.style[domTransition]='background-color 0s, color 0s';
				if (me._sel_area_button.ggCurrentLogicStateBackgroundColor == 0) {
					me._sel_area_button__text.style.backgroundColor="rgba(255,255,255,1)";
				}
				else {
					me._sel_area_button__text.style.backgroundColor="rgba(37,61,143,1)";
				}
			}
		}
		me._sel_area_button.logicBlock_textcolor = function() {
			var newLogicStateTextColor;
			if (
				((me.elementMouseOver['sel_area_button'] == true)) || 
				((me._sel_area_button.ggIsActive() == true))
			)
			{
				newLogicStateTextColor = 0;
			}
			else {
				newLogicStateTextColor = -1;
			}
			if (me._sel_area_button.ggCurrentLogicStateTextColor != newLogicStateTextColor) {
				me._sel_area_button.ggCurrentLogicStateTextColor = newLogicStateTextColor;
				me._sel_area_button__text.style[domTransition]='background-color 0s, color 0s';
				if (me._sel_area_button.ggCurrentLogicStateTextColor == 0) {
					me._sel_area_button__text.style.color="rgba(19,19,19,1)";
				}
				else {
					me._sel_area_button__text.style.color="rgba(255,255,255,1)";
				}
			}
		}
		me._sel_area_button.onclick=function (e) {
			skin._scrollarea_list_thumb.style['display']='none';
			var p = skin._scrollarea_list_thumb.parentElement;
			while (p != null && p!==this.divSkin) {
				if (p.ggType && p.ggType == 'cloner') {
					if (p.ggAutoPosition) {
						p.ggAutoPosition(false);
					}
				}
				if (p.ggType && p.ggType == 'scrollarea') {
					if (p.ggUpdatePosition) {
						p.ggUpdatePosition();
					}
				}
				p = p.parentElement;
			}
			skin.updateSize(skin._scrollarea_list_thumb);
			skin._cloner_thumb.ggText=me.ggTag;
			if (skin._cloner_thumb.ggText=='') {
				skin._cloner_thumb.ggUpdate([]);
			} else {
				skin._cloner_thumb.ggUpdate(skin._cloner_thumb.ggText.split(','));
			}
			skin.updateSize(skin.divSkin);
			skin._scrollarea_list_thumb.style['display']='inline';
			var p = skin._scrollarea_list_thumb.parentElement;
			while (p != null && p!==this.divSkin) {
				if (p.ggType && p.ggType == 'cloner') {
					if (p.ggAutoPosition) {
						p.ggAutoPosition(false);
					}
				}
				if (p.ggType && p.ggType == 'scrollarea') {
					if (p.ggUpdatePosition) {
						p.ggUpdatePosition();
					}
				}
				p = p.parentElement;
			}
			skin.updateSize(skin._scrollarea_list_thumb);
			skin._tt_list_head.ggText=me.ggTitle;
			skin._tt_list_head.ggTextDiv.innerHTML=skin._tt_list_head.ggText;
			if (skin._tt_list_head.ggUpdateText) {
				skin._tt_list_head.ggUpdateText=function() {
					var hs=me.ggTitle;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._tt_list_head.ggUpdatePosition) {
				skin._tt_list_head.ggUpdatePosition();
			}
			skin._tt_list_head.ggTextDiv.scrollTop = 0;
		}
		me._sel_area_button.onmouseover=function (e) {
			me.elementMouseOver['sel_area_button']=true;
			me._sel_area_button.logicBlock_backgroundcolor();
			me._sel_area_button.logicBlock_textcolor();
		}
		me._sel_area_button.onmouseout=function (e) {
			if (e && e.toElement) {
				var current = e.toElement;
				while (current = current.parentNode) {
				if (current == me._sel_area_button__text)
					return;
				}
			}
			me.elementMouseOver['sel_area_button']=false;
			me._sel_area_button.logicBlock_backgroundcolor();
			me._sel_area_button.logicBlock_textcolor();
		}
		me._sel_area_button.ontouchend=function (e) {
			me.elementMouseOver['sel_area_button']=false;
			me._sel_area_button.logicBlock_backgroundcolor();
			me._sel_area_button.logicBlock_textcolor();
		}
		me._sel_area_button.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._sel_area_button);
	};
	function SkinCloner_cloner_thumb_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 250px; height: 130px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._rec_clone_thumb=document.createElement('div');
		el.ggId="rec_clone_thumb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 130px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		hs+='border-bottom: 1px solid #4f4f4f;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_clone_thumb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rec_clone_thumb.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._rec_clone_thumb.ggCurrentLogicStateSize != newLogicStateSize) {
				me._rec_clone_thumb.ggCurrentLogicStateSize = newLogicStateSize;
				me._rec_clone_thumb.style[domTransition]='width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._rec_clone_thumb.ggCurrentLogicStateSize == 0) {
					me._rec_clone_thumb.style.width='350px';
					me._rec_clone_thumb.style.height='170px';
					setTimeout(function() {skin.updateSize(me._rec_clone_thumb);}, 500);
				}
				else {
					me._rec_clone_thumb.style.width='250px';
					me._rec_clone_thumb.style.height='130px';
					setTimeout(function() {skin.updateSize(me._rec_clone_thumb);}, 500);
				}
			}
		}
		me._rec_clone_thumb.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._rec_clone_thumb);
		el=me._nodeimage_thumb=document.createElement('div');
		els=me._nodeimage_thumb__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/nodeimage_thumb_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="NodeImage_thumb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 120px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		me._nodeimage_thumb.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._nodeimage_thumb.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._nodeimage_thumb.ggCurrentLogicStateSize != newLogicStateSize) {
				me._nodeimage_thumb.ggCurrentLogicStateSize = newLogicStateSize;
				me._nodeimage_thumb.style[domTransition]='width 500ms ease 0ms, height 500ms ease 0ms';
				if (me._nodeimage_thumb.ggCurrentLogicStateSize == 0) {
					me._nodeimage_thumb.style.width='350px';
					me._nodeimage_thumb.style.height='160px';
					setTimeout(function() {skin.updateSize(me._nodeimage_thumb);}, 500);
				}
				else {
					me._nodeimage_thumb.style.width='250px';
					me._nodeimage_thumb.style.height='120px';
					setTimeout(function() {skin.updateSize(me._nodeimage_thumb);}, 500);
				}
			}
		}
		me._nodeimage_thumb.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
			player.setVariableValue('show_menu_thumb', false);
		}
		me._nodeimage_thumb.onmouseover=function (e) {
			me.elementMouseOver['nodeimage_thumb']=true;
			me._rec_active.logicBlock_visible();
		}
		me._nodeimage_thumb.onmouseout=function (e) {
			me.elementMouseOver['nodeimage_thumb']=false;
			me._rec_active.logicBlock_visible();
		}
		me._nodeimage_thumb.ontouchend=function (e) {
			me.elementMouseOver['nodeimage_thumb']=false;
			me._rec_active.logicBlock_visible();
		}
		me._nodeimage_thumb.ggUpdatePosition=function (useTransition) {
		}
		el=me._rec_active=document.createElement('div');
		el.ggId="Rec_active";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffaa00;';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 6px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rec_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rec_active.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._rec_active.ggIsActive() == true)) || 
				((me.elementMouseOver['nodeimage_thumb'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._rec_active.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._rec_active.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._rec_active.style[domTransition]='';
				if (me._rec_active.ggCurrentLogicStateVisible == 0) {
					me._rec_active.style.visibility=(Number(me._rec_active.style.opacity)>0||!me._rec_active.style.opacity)?'inherit':'hidden';
					me._rec_active.ggVisible=true;
				}
				else {
					me._rec_active.style.visibility="hidden";
					me._rec_active.ggVisible=false;
				}
			}
		}
		me._rec_active.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._nodeimage_thumb.appendChild(me._rec_active);
		el=me._boxcheck=document.createElement('div');
		els=me._boxcheck__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiA8cGF0aCBmaWxsPSIjZmZhYTAwIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik0xNiwuNEExNS42LDE1LjYsMCwxLDAsMzEuNiwxNiwxNS42LDE1LjYsMCwwLDAsMTYsLjRabTAsMjcuMkExMS43LDExLjcsMCwwLDEsNC4zLDE2YTExLjcsMTEuNywwLDAsMSwyMy40LDBBMTEuNywxMS43LDAsMCwxLDE2LDI3LjZaIi8+Cjwvc3ZnPgo=';
		me._boxcheck__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="box-check";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 22px;';
		hs+='position : absolute;';
		hs+='right : 3px;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 22px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._boxcheck.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._boxcheck.ggUpdatePosition=function (useTransition) {
		}
		el=me._check=document.createElement('div');
		els=me._check__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiA8cGF0aCBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGQ9Ik0yNC44LDEyLjZsLTkuNiw5LjhhMiwyLDAsMCwxLTMsMGwtNS01LjFhMi4yLDIuMiwwLDAsMSwwLTMsMi4xLDIuMSwwLDAsMSwyLjksMEwxMy43LDE4bDguMi04LjRhMS45LDEuOSwwLDAsMSwyLjksMEEyLjIsMi4yLDAsMCwxLDI0LjgsMTIuNloiLz4KPC9zdmc+Cg==';
		me._check__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="check";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 22px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._check.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._check.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._check.ggElementNodeId()) == true)) || 
				((me._check.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._check.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._check.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._check.style[domTransition]='';
				if (me._check.ggCurrentLogicStateVisible == 0) {
					me._check.style.visibility=(Number(me._check.style.opacity)>0||!me._check.style.opacity)?'inherit':'hidden';
					me._check.ggVisible=true;
				}
				else {
					me._check.style.visibility="hidden";
					me._check.ggVisible=false;
				}
			}
		}
		me._check.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._boxcheck.appendChild(me._check);
		me._nodeimage_thumb.appendChild(me._boxcheck);
		el=me._tt_thumb=document.createElement('div');
		els=me._tt_thumb__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_thumb";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text test_tt";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 40px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 250px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 250px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #5b5b5b;';
		hs+='background: rgba(91,91,91,0.588235);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 15px;';
		hs+='font-weight: 600;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+="display: flex; align-items: center; padding: 5px 20px 5px 10px; margin: 5px 0px 0px 0px;";
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._tt_thumb.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_thumb.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((player.getIsMobile() == true))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._tt_thumb.ggCurrentLogicStateSize != newLogicStateSize) {
				me._tt_thumb.ggCurrentLogicStateSize = newLogicStateSize;
				me._tt_thumb__text.style[domTransition]='width 0s, height 0s';
				if (me._tt_thumb.ggCurrentLogicStateSize == 0) {
					me._tt_thumb__text.style.width='350px';
					me._tt_thumb__text.style.height='40px';
					skin.updateSize(me._tt_thumb);
				}
				else {
					me._tt_thumb__text.style.width='250px';
					me._tt_thumb__text.style.height='40px';
					skin.updateSize(me._tt_thumb);
				}
			}
		}
		me._tt_thumb.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((me.ggUserdata.description == ""))
			)
			{
				newLogicStateText = 0;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_thumb.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_thumb.ggCurrentLogicStateText = newLogicStateText;
				me._tt_thumb.style[domTransition]='width 0s, height 0s';
				if (me._tt_thumb.ggCurrentLogicStateText == 0) {
					me._tt_thumb.ggText=me.ggUserdata.title;
					me._tt_thumb__text.innerHTML=me._tt_thumb.ggText;
					if (me._tt_thumb.ggUpdateText) {
					me._tt_thumb.ggUpdateText=function() {
						var hs=me.ggUserdata.title;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumb.ggUpdatePosition) me._tt_thumb.ggUpdatePosition();
					}
				}
				else {
					me._tt_thumb.ggText=me.ggUserdata.title;
					me._tt_thumb__text.innerHTML=me._tt_thumb.ggText;
					if (me._tt_thumb.ggUpdateText) {
					me._tt_thumb.ggUpdateText=function() {
						var hs=me.ggUserdata.title;
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_thumb.ggUpdatePosition) me._tt_thumb.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_thumb.ggUpdatePosition=function (useTransition) {
		}
		me._nodeimage_thumb.appendChild(me._tt_thumb);
		me.__div.appendChild(me._nodeimage_thumb);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: "Montserrat"; font-size: 14px;} .gg_contextmenu { border-radius: 10px; overflow: hidden; background-color: #002a5e !important } .gg_context_row a { color: white !important } .gg_context_row { color: white !important } .gg_context_row:hover { background-color: #a8c543 !important } .ggskin { font-family: calibri; font-size: 14px; } .ggskin a { color: #613e0c; text-decoration: none; } .ggskin a:hover { color: #a8c543; text-decoration: underline; } .gg_context_row { text-align: left !important; } /* width */ ::-webkit-scrollbar { width: 6px; } /* Track */ ::-webkit-scrollbar-track { background-color: rgb(76, 76, 76); border-radius: 6px; } /* Handle */ ::-webkit-scrollbar-thumb { background-color: rgb(37, 61, 143); border-radius: 6px; } /* Handle on hover */ ::-webkit-scrollbar-thumb:hover { background-color: rgb(37, 61, 143); } @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes stretch { 0% { transform: scale(1); } 100% { transform: scale(1.2); } } @keyframes pulse { 0% { -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.5); box-shadow: 0 0 0 0 rgba(213, 213, 213, 0.7); border-radius: 100%; } 70% { -moz-box-shadow: 0 0 0 30px rgba(204, 169, 44, 0); box-shadow: 0 0 0 40px rgba(213, 213, 213, 0); border-radius: 100%; } 100% { -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0); box-shadow: 0 0 0 0 rgba(213, 213, 213, 0); border-radius: 100%; } } h4 { color: rgb(37, 61, 143); text-align: center; font-size: 20px; padding : 0px; margin :0px;} p { margin: 0px; padding: 0px; font-size: 15px;}'));
	document.head.appendChild(style);
	me._info_pad.logicBlock_position();
	me._volume_pad.logicBlock_position();
	me._language_pad.logicBlock_position();
	me._share_pad.logicBlock_position();
	me._container_list_menu.logicBlock_size();
	me._sel_area_scroll.logicBlock_size();
	me._info_con.logicBlock_position();
	me._info_con.logicBlock_size();
	me._container_hd.logicBlock_scaling();
	me._zoom_in_ico.logicBlock_visible();
	me._zoom_out_ico.logicBlock_visible();
	me._volume_pad.logicBlock_visible();
	me._volume_on_ico.logicBlock_visible();
	me._volume_off_ico.logicBlock_visible();
	me._language_pad.logicBlock_visible();
	me._vi_lang.logicBlock_visible();
	me._en_lang.logicBlock_visible();
	me._share_pad.logicBlock_visible();
	me._vr_pad.logicBlock_visible();
	me._zoom_pad.logicBlock_visible();
	me._scrollarea.logicBlock_position();
	me._scrollarea.logicBlock_alpha();
	me._map_ico.logicBlock_alpha();
	me._stop_next_node.logicBlock_visible();
	me._play_next_node.logicBlock_visible();
	me._map_container.logicBlock_position();
	me._map_container.logicBlock_size();
	me._map_container.logicBlock_alpha();
	me._tt_current.logicBlock_position();
	me._tt_current.logicBlock_size();
	me._global_active_ico.logicBlock_visible();
	me._map_scale.logicBlock_angle();
	me._map_hide_ico.logicBlock_visible();
	me._rec_off_thumb_menu.logicBlock_alpha();
	me._container_list_menu.logicBlock_position();
	me._container_list_menu.logicBlock_alpha();
	me._shade.logicBlock_alpha();
	me._popup.logicBlock_position();
	me._popup.logicBlock_size();
	me._popup.logicBlock_visible();
	me._close_gallery.logicBlock_position();
	me._popup_video.logicBlock_visible();
	me._close_video_ytb.logicBlock_position();
	me._container_tooltip.logicBlock_visible();
	me._tooltip_hs.logicBlock_visible();
	me._info_con.logicBlock_alpha();
	me._info_rec.logicBlock_position();
	me.__3d_space_con.logicBlock_scaling();
	me.__3d_space_con.logicBlock_visible();
	me.__3d_space_popup.logicBlock_alpha();
	me.__3d_space_popup.logicBlock_bordercolor();
	me.__3d_space_rec.logicBlock_alpha();
	me._container_info.logicBlock_alpha();
	me._container_info_c.logicBlock_alpha();
	me._container_map_4d.logicBlock_visible();
	me._container_map_4d.logicBlock_alpha();
	me._container_callout.logicBlock_visible();
	me._bg_intro.logicBlock_scaling();
	me._bg_intro.logicBlock_alpha();
	me._powered_by.logicBlock_scaling();
	me._powered_by.logicBlock_visible();
	me._remote_container.logicBlock_scaling();
	me._info_pad.logicBlock_visible();
	me._info_pad.logicBlock_backgroundcolor();
	me._volume_pad.logicBlock_backgroundcolor();
	me._language_pad.logicBlock_backgroundcolor();
	me._share_pad.logicBlock_backgroundcolor();
	me._video_ico.logicBlock_visible();
	me._gallery_ico.logicBlock_visible();
	me._controler_m.logicBlock_visible();
	me._next_area.logicBlock_position();
	me._next_area.logicBlock_scaling();
	me._tt_area_button.logicBlock_visible();
	me._scrollarea.logicBlock_visible();
	me._click_drag.logicBlock_visible();
	me._container_logo.logicBlock_position();
	me._container_logo.logicBlock_scaling();
	me._next_node.logicBlock_position();
	me._scrollarea_list_thumb.logicBlock_size();
	me._cloner_thumb.logicBlock_size();
	me._close_menu_mobile.logicBlock_visible();
	me._fullscreen_gallery_on.logicBlock_visible();
	me._popup_video.logicBlock_position();
	me._popup_video.logicBlock_size();
	me._tooltip_hs_con.logicBlock_visible();
	me._container_info.logicBlock_size();
	me._info_image.logicBlock_position();
	me._info_image.logicBlock_size();
	me._text_info.logicBlock_position();
	me._text_info.logicBlock_size();
	me._close_info.logicBlock_position();
	me._container_info_c.logicBlock_size();
	me._info_image_c.logicBlock_position();
	me._info_image_c.logicBlock_size();
	me._text_info_c.logicBlock_position();
	me._text_info_c.logicBlock_size();
	me._close_info_c.logicBlock_position();
	me._container_map_4d.logicBlock_size();
	me._container_callout.logicBlock_size();
	me._close_gallery_callout.logicBlock_position();
	player.addListener('sizechanged', function(args) { me._info_pad.logicBlock_position();me._volume_pad.logicBlock_position();me._language_pad.logicBlock_position();me._share_pad.logicBlock_position();me._container_list_menu.logicBlock_size();me._sel_area_scroll.logicBlock_size();me._info_con.logicBlock_position();me._info_con.logicBlock_size();me._container_hd.logicBlock_scaling(); });
	player.addListener('fullscreenenter', function(args) { me._zoom_in_ico.logicBlock_visible();me._zoom_out_ico.logicBlock_visible(); });
	player.addListener('fullscreenexit', function(args) { me._zoom_in_ico.logicBlock_visible();me._zoom_out_ico.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._volume_pad.logicBlock_visible();me._volume_on_ico.logicBlock_visible();me._volume_off_ico.logicBlock_visible();me._language_pad.logicBlock_visible();me._vi_lang.logicBlock_visible();me._en_lang.logicBlock_visible();me._share_pad.logicBlock_visible();me._vr_pad.logicBlock_visible();me._zoom_pad.logicBlock_visible();me._scrollarea.logicBlock_position();me._scrollarea.logicBlock_alpha();me._map_ico.logicBlock_alpha();me._stop_next_node.logicBlock_visible();me._play_next_node.logicBlock_visible();me._map_container.logicBlock_position();me._map_container.logicBlock_size();me._map_container.logicBlock_alpha();me._tt_current.logicBlock_position();me._tt_current.logicBlock_size();me._global_active_ico.logicBlock_visible();me._map_scale.logicBlock_angle();me._map_hide_ico.logicBlock_visible();me._rec_off_thumb_menu.logicBlock_alpha();me._container_list_menu.logicBlock_position();me._container_list_menu.logicBlock_alpha();me._shade.logicBlock_alpha();me._popup.logicBlock_position();me._popup.logicBlock_size();me._popup.logicBlock_visible();me._close_gallery.logicBlock_position();me._popup_video.logicBlock_visible();me._close_video_ytb.logicBlock_position();me._container_tooltip.logicBlock_visible();me._tooltip_hs.logicBlock_visible();me._info_con.logicBlock_alpha();me._info_rec.logicBlock_position();me.__3d_space_con.logicBlock_scaling();me.__3d_space_con.logicBlock_visible();me.__3d_space_popup.logicBlock_alpha();me.__3d_space_popup.logicBlock_bordercolor();me.__3d_space_rec.logicBlock_alpha();me._container_info.logicBlock_alpha();me._container_info_c.logicBlock_alpha();me._container_map_4d.logicBlock_visible();me._container_map_4d.logicBlock_alpha();me._container_callout.logicBlock_visible();me._bg_intro.logicBlock_scaling();me._bg_intro.logicBlock_alpha(); });
	player.addListener('configloaded', function(args) { me._powered_by.logicBlock_scaling();me._powered_by.logicBlock_visible();me._remote_container.logicBlock_scaling();me._info_pad.logicBlock_position();me._info_pad.logicBlock_visible();me._info_pad.logicBlock_backgroundcolor();me._volume_pad.logicBlock_position();me._volume_pad.logicBlock_visible();me._volume_pad.logicBlock_backgroundcolor();me._language_pad.logicBlock_position();me._language_pad.logicBlock_visible();me._language_pad.logicBlock_backgroundcolor();me._share_pad.logicBlock_position();me._share_pad.logicBlock_visible();me._share_pad.logicBlock_backgroundcolor();me._video_ico.logicBlock_visible();me._gallery_ico.logicBlock_visible();me._controler_m.logicBlock_visible();me._next_area.logicBlock_position();me._next_area.logicBlock_scaling();me._tt_area_button.logicBlock_visible();me._scrollarea.logicBlock_visible();me._click_drag.logicBlock_visible();me._container_logo.logicBlock_position();me._container_logo.logicBlock_scaling();me._next_node.logicBlock_position();me._rec_off_thumb_menu.logicBlock_alpha();me._container_list_menu.logicBlock_position();me._container_list_menu.logicBlock_size();me._sel_area_scroll.logicBlock_size();me._scrollarea_list_thumb.logicBlock_size();me._cloner_thumb.logicBlock_size();me._close_menu_mobile.logicBlock_visible();me._popup.logicBlock_position();me._popup.logicBlock_size();me._fullscreen_gallery_on.logicBlock_visible();me._close_gallery.logicBlock_position();me._popup_video.logicBlock_position();me._popup_video.logicBlock_size();me._close_video_ytb.logicBlock_position();me._tooltip_hs_con.logicBlock_visible();me._info_con.logicBlock_position();me._info_con.logicBlock_size();me._container_info.logicBlock_size();me._info_image.logicBlock_position();me._info_image.logicBlock_size();me._text_info.logicBlock_position();me._text_info.logicBlock_size();me._close_info.logicBlock_position();me._container_info_c.logicBlock_size();me._info_image_c.logicBlock_position();me._info_image_c.logicBlock_size();me._text_info_c.logicBlock_position();me._text_info_c.logicBlock_size();me._close_info_c.logicBlock_position();me._container_map_4d.logicBlock_size();me._container_callout.logicBlock_size();me._close_gallery_callout.logicBlock_position(); });
	player.addListener('varchanged_show_menu_thumb', function(args) { me._scrollarea.logicBlock_position();me._scrollarea.logicBlock_alpha();me._map_container.logicBlock_alpha();me._rec_off_thumb_menu.logicBlock_alpha();me._container_list_menu.logicBlock_position();me._container_list_menu.logicBlock_alpha(); });
	player.addListener('varchanged_map_hide', function(args) { me._map_ico.logicBlock_alpha();me._map_container.logicBlock_size();me._map_container.logicBlock_alpha();me._map_hide_ico.logicBlock_visible(); });
	player.addListener('varchanged_3D_space_open', function(args) { me._map_container.logicBlock_alpha();me.__3d_space_con.logicBlock_scaling();me.__3d_space_con.logicBlock_visible();me.__3d_space_popup.logicBlock_alpha();me.__3d_space_rec.logicBlock_alpha(); });
	player.addListener('varchanged_open_popup', function(args) { me._map_container.logicBlock_alpha();me._shade.logicBlock_alpha();me._popup.logicBlock_visible(); });
	player.addListener('varchanged_map_scale_normal', function(args) { me._map_container.logicBlock_size();me._tt_current.logicBlock_position();me._tt_current.logicBlock_size();me._map_scale.logicBlock_angle(); });
	player.addListener('varchanged_map_scale_full', function(args) { me._map_container.logicBlock_position();me._map_container.logicBlock_size();me._map_scale.logicBlock_angle(); });
	player.addListener('varchanged_hs_info', function(args) { me._rec_off_thumb_menu.logicBlock_alpha();me._container_info.logicBlock_alpha(); });
	player.addListener('varchanged_hs_info_c', function(args) { me._rec_off_thumb_menu.logicBlock_alpha();me._container_info_c.logicBlock_alpha(); });
	player.addListener('varchanged_map_4d', function(args) { me._rec_off_thumb_menu.logicBlock_alpha();me._container_map_4d.logicBlock_visible();me._container_map_4d.logicBlock_alpha(); });
	player.addListener('varchanged_callout_gallery', function(args) { me._rec_off_thumb_menu.logicBlock_alpha();me._container_callout.logicBlock_visible(); });
	player.addListener('varchanged_gallery_full', function(args) { me._popup.logicBlock_position();me._popup.logicBlock_size();me._close_gallery.logicBlock_position();me._close_video_ytb.logicBlock_position(); });
	player.addListener('varchanged_open_video', function(args) { me._popup_video.logicBlock_visible(); });
	player.addListener('varchanged_tooltip_hover', function(args) { me._container_tooltip.logicBlock_visible(); });
	player.addListener('varchanged_information', function(args) { me._info_con.logicBlock_alpha();me._info_rec.logicBlock_position(); });
	player.addListener('varchanged_var_intro', function(args) { me._bg_intro.logicBlock_scaling();me._bg_intro.logicBlock_alpha(); });
	player.addListener('varchanged_show_remote', function(args) { me._volume_pad.logicBlock_visible();me._language_pad.logicBlock_visible();me._share_pad.logicBlock_visible();me._vr_pad.logicBlock_visible();me._zoom_pad.logicBlock_visible(); });
	player.addListener('varchanged_gallery_border', function(args) { me.__3d_space_popup.logicBlock_bordercolor(); });
	player.addListener('varchanged_sound_on', function(args) { me._volume_on_ico.logicBlock_visible();me._volume_off_ico.logicBlock_visible(); });
	player.addListener('varchanged_tran_en', function(args) { me._vi_lang.logicBlock_visible();me._en_lang.logicBlock_visible(); });
	player.addListener('varchanged_play_nextnode', function(args) { me._stop_next_node.logicBlock_visible();me._play_next_node.logicBlock_visible(); });
	player.addListener('varchanged_map_sel', function(args) { me._global_active_ico.logicBlock_visible(); });
	player.addListener('sizechanged', function(args) { me._cloner_next_area.callChildLogicBlocks_sizechanged(); });
	player.addListener('changenode', function(args) { me._cloner_next_area.callChildLogicBlocks_changenode();me._sel_floorplan_clone.callChildLogicBlocks_changenode();me._cloner_thumb.callChildLogicBlocks_changenode(); });
	player.addListener('configloaded', function(args) { me._cloner_next_area.callChildLogicBlocks_configloaded();me._cloner_thumb.callChildLogicBlocks_configloaded(); });
	player.addListener('mouseover', function(args) { me._sel_floorplan_clone.callChildLogicBlocks_mouseover();me._sel_area_clone.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._cloner_thumb.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._cloner_area.callChildLogicBlocks_active();me._sel_floorplan_clone.callChildLogicBlocks_active();me._sel_area_clone.callChildLogicBlocks_active();me._cloner_thumb.callChildLogicBlocks_active(); });
	player.addListener('clonerchanged', function(args) { me._sel_floorplan_clone.callChildLogicBlocks_clonerchanged(); });
	player.addListener('changevisitednodes', function(args) { me._cloner_thumb.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._cloner_next_area.callChildLogicBlocks_activehotspotchanged();me._cloner_thumb.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('varchanged_map_sel', function(args) { me._sel_floorplan_clone.callChildLogicBlocks_varchanged_map_sel(); });
	player.addListener('changenode', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_changenode(); });
	player.addListener('configloaded', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_configloaded(); });
	player.addListener('mouseover', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('mouseover', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('changenode', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_active(); });
	player.addListener('hastouch', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_hastouch(); });
	player.addListener('activehotspotchanged', function(args) { me._map_01.callChildLogicBlocksHotspot_map_pin_activehotspotchanged(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_fun_changenode();me.callChildLogicBlocksHotspot_ht_arrow_changenode();me.callChildLogicBlocksHotspot_ht_info_c_changenode();me.callChildLogicBlocksHotspot_ht_info_b_changenode();me.callChildLogicBlocksHotspot_ht_node_a_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_callout_m_configloaded();me.callChildLogicBlocksHotspot_ht_arrow_configloaded();me.callChildLogicBlocksHotspot_ht_info_c_configloaded();me.callChildLogicBlocksHotspot_ht_info_b_configloaded();me.callChildLogicBlocksHotspot_ht_node_a_configloaded();me.callChildLogicBlocksHotspot_ht_ring_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_fun_mouseover();me.callChildLogicBlocksHotspot_ht_arrow_mouseover();me.callChildLogicBlocksHotspot_ht_node_a_mouseover();me.callChildLogicBlocksHotspot_ht_ring_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_a_active(); });
	player.addListener('vrchanged', function(args) { me.callChildLogicBlocksHotspot_ht_ring_vrchanged(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_a_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me.callChildLogicBlocksHotspot_ht_arrow_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_info_c_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_info_b_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_node_a_activehotspotchanged(); });
	player.addListener('varchanged_ht_colour', function(args) { me.callChildLogicBlocksHotspot_ht_node_fun_varchanged_ht_colour(); });
	player.addListener('varchanged_var_hs', function(args) { me.callChildLogicBlocksHotspot_ht_info_c_varchanged_var_hs();me.callChildLogicBlocksHotspot_ht_info_b_varchanged_var_hs();me.callChildLogicBlocksHotspot_ht_node_a_varchanged_var_hs(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};