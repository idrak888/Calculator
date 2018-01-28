$(document).ready(function(){
	var $item = '';
	var $turn = 0;
	var allHidden = 8;

	$('#congo').hide();
	$('#error').hide();

	$('#table2').hide().delay(5000).fadeIn(1000);
	
		$('#table2 tr td button').on('click', function(){
 			if ($turn == 0 && $item == '') {
 				$(this).css("opacity", 0.1);
				$item = $(this).val();
				$turn += 1;
				allHidden -= 1;
 			}
 			else if ($turn == 1 && $item != '') {
 				if ($(this).val() == $item) {
 					$(this).css("opacity", 0.1);
 					$item = '';
 					$turn = 0;
 					allHidden -= 1;
 				}
 				else {
 					$('#error').show()
 					$turn = 3;
 					allHidden = 1000;
 				}
 			}
 			switch (allHidden) {
 				case 0:
 					$('#congo').show();
 			}
		});
});
 