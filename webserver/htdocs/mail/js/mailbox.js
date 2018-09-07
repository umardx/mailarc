$(document).ready(function() {
	// Show element counter for tables
	$('[data-toggle="tooltip"]').tooltip();
	var rowCountDomainAlias = $('#domainaliastable >tbody >tr').length;
	var rowCountDomain = $('#domaintable >tbody >tr').length;
	var rowCountMailbox = $('#mailboxtable >tbody >tr').length;
	var rowCountAlias = $('#aliastable >tbody >tr').length;
	$("#numRowsDomainAlias").text(rowCountDomainAlias);
	$("#numRowsDomain").text(rowCountDomain);
	$("#numRowsMailbox").text(rowCountMailbox);
	$("#numRowsAlias").text(rowCountAlias);
	
	// Filter table function
	$.fn.extend({
		filterTable: function(){
			return this.each(function(){
				$(this).on('keyup', function(e){
					$('.filterTable_no_results').remove();
					var $this = $(this),
                        search = $this.val().toLowerCase(),
                        target = $this.attr('data-filters'),
                        $target = $(target),
                        $rows = $target.find('tbody tr');
					if(search == '') {
						$rows.show();
					} else {
						$rows.each(function(){
							var $this = $(this);
							$this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
						})
						if($target.find('tbody tr:visible').size() === 0) {
							var col_count = $target.find('tr').first().find('td').size();
							var no_results = $('<tr class="filterTable_no_results"><td colspan="100%">-</td></tr>')
							$target.find('tbody').append(no_results);
						}
					}
				});
			});
		}
	});
	$('[data-action="filter"]').filterTable();
	$('.container').on('click', '.panel-heading span.filter', function(e){
		var $this = $(this),
		$panel = $this.parents('.panel');
		$panel.find('.panel-body').slideToggle("fast");
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});
});