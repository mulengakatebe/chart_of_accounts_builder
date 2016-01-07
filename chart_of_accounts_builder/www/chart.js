frappe.provide("erpnext.ChartBuilder");

erpnext.ChartBuilder = Class.extend({
	init: function() {
		var me = this;
		this.toolbar = [
			{
				label: __("Add Child"),
				click: function() {
					me.make_new()
				},
			},
			{
				label: __("Rename"),
				click: function(node) {
					me.rename_account();
				},
			},
			{
				label: __("Delete"),
				click: function(node) {
					me.delete_account();
				},
			}
		]
	},

	bind_events: function() {
		this.bind_node_toolbar();
	},

	bind_node_toolbar: function() {
		var me = this;

		$(".tree-link").on("click", function() {
			me.current_account = $(this).attr('data-name');


			$('.bold').removeClass('bold');
			$(this).addClass("bold");


			var toolbar = $('<span class="tree-node-toolbar btn-group"></span>').insertAfter(this);

			$.each(me.toolbar, function(i, item) {
				var link = $("<button class='btn btn-default btn-xs'></button>")
					.html(item.label)
					.appendTo(toolbar)
					.click(function() {
						item.click(me, this);
						return false;
					}
				);

				link.addClass("hidden-xs");

			})

			if(me.current_toolbar) {
				$(me.current_toolbar).toggle(false);
			}
			me.current_toolbar = toolbar;
			$(this).toggle(true);

		});
	},

	make_new: function() {
		var d = new frappe.ui.Dialog({
			title:__('New Account'),
			fields: [
				{fieldtype:'Data', fieldname:'account_name', label:__('New Account Name'), reqd:true,
					description: __("Name of new Account. Note: Please don't create accounts for Customers and Suppliers")},
				{fieldtype:'Check', fieldname:'is_group', label:__('Is Group'),
					description: __('Further accounts can be made under Groups, but entries can be made against non-Groups')},
				{fieldtype:'Select', fieldname:'root_type', label:__('Root Type'),
					options: ['Asset', 'Liability', 'Equity', 'Income', 'Expense'].join('\n'),
				},
				{fieldtype:'Select', fieldname:'account_type', label:__('Account Type'),
					options: ['', 'Bank', 'Cash', 'Warehouse', 'Tax', 'Chargeable'].join('\n'),
					description: __("Optional. This setting will be used to filter in various transactions.")},
			]
		})
		d.set_primary_action('Submit', function() {

		})
		d.show()
	},

	rename_account: function() {

	},

	delete_account: function() {
		console.log(this)
	}
})


frappe.ready(function() {
	frappe.require("/assets/js/dialog.min.js");
	erpnext.coa = new erpnext.ChartBuilder();
	erpnext.coa.bind_events();
});