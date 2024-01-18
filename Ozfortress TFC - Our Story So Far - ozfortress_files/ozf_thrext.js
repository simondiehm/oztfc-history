/**
 * ozfortress thread extender support functions
 *
 *
 *
 */

YAHOO.namespace("ozfortress.thrext");

// SHOW HIDE
YAHOO.ozfortress.thrext.showhide = function (s_sender, s_changer, s_type) {
	// register the showhide
	sender = YAHOO.util.Dom.get(s_sender);
	changer = YAHOO.util.Dom.get(s_changer);
	YAHOO.util.Event.addListener(sender, s_type, this.doshowhide, sender, changer);

	if (sender.value != -1)
	{
		YAHOO.util.Dom.setStyle(changer, 'opacity', 0);
	}
};

YAHOO.ozfortress.thrext.showhide.prototype = {
	doshowhide: function(e, obj) {
		if (obj.value == -1) {
			YAHOO.util.Dom.setStyle(this, 'opacity', 1);
		}
		else {
			YAHOO.util.Dom.setStyle(this, 'opacity', 0);
		}
	}
};

// AJAX RELOAD
YAHOO.ozfortress.thrext.reload_register = function (s_sender, s_form, s_replace, s_type) {
	// register reload
	var sender = YAHOO.util.Dom.get(s_sender);
	var form = YAHOO.util.Dom.get(s_form);
	var replace = YAHOO.util.Dom.get(s_replace);
	YAHOO.util.Event.addListener(sender, s_type, YAHOO.ozfortress.thrext.reload, { dataform: form, replacement: replace });
};

YAHOO.ozfortress.thrext.reload = function (e, obj) {
	var reload_callback = {
		success: YAHOO.ozfortress.thrext.reload_success,
		argument: { replacement: obj.replacement }
	}

	YAHOO.util.Connect.setForm(obj.dataform);
	YAHOO.util.Connect.asyncRequest('POST', '/ajax.php?ozf_thrext_enable=1', reload_callback);
};

YAHOO.ozfortress.thrext.reload_success = function (o) {
	YAHOO.plugin.Dispatcher.process(o.argument.replacement, o.responseText);
	//o.argument.replacement.innerHTML = o.responseText;
};
