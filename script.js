$('body')
  .on('focus', '[contenteditable]', function() {
    const $this = $(this);
    $this.data('before', $this.html());
  })
  .on('blur keyup paste input', '[contenteditable]', function() {
    const $this = $(this);
    if ($this.data('before') !== $this.html()) {
      $this.data('before', $this.html());
      $this.trigger('change');
    }
  });

$('td[data-actual]').change(function() {
  // $(this).getAttribute('data-actual');
});

const dataAct = document.querySelectorAll('td[data-actual]');

var i;
for (i = 0; i < dataAct.length; i++) {
  let target = document.querySelectorAll('td[data-target]')[i];
  let result = document.querySelectorAll('td[data-final]')[i];
  dataAct[i].onchange = function() {
    let rowName = Number(this.outerText);
    let targetName = Number(target.outerText);

    console.log(rowName);
    console.log(targetName);

    function diff(num1, num2) {
      return num1 - num2;
    }

    let resultsof = diff(rowName, targetName);

    result.innerHTML = resultsof;
  };
}

var doc = new jsPDF();
var specialElementHandlers = {
  '#editor': function(element, renderer) {
    return true;
  }
};

$('#cmd').click(function() {
  doc.fromHTML($('.container').html(), 15, 15, {
    width: 170,
    elementHandlers: specialElementHandlers
  });
  doc.save('sample-file.pdf');
});
