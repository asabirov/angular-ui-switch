angular.module('uiSwitch', [])

.directive('switch', ['$parse', function($parse) {
  var template = function(element, attrs) {
    var html = '';
    var extraMethod = null;

    if (attrs.ngChange) {
      extraMethod = 'ngChange()';
    }

    html += '<span';

    html +=   ' class="switch' + (attrs.class ? ' ' + attrs.class : '');
    html +=   attrs.size ? ' switchery-' + attrs.size : '';
    html +=   '"';

    html +=   attrs.ngModel ? ' ng-click="' + attrs.disabled + ' ? null : (ngModel = (ngModel == onValue ? offValue : onValue));' + extraMethod +'"' : '';
    html +=   ' ng-class="{ checked: ngModel == onValue, disabled:' + attrs.disabled + ' }"';

    html +=   '>';
    html +=   '<small></small>';
    html +=   '<input type="checkbox"';
    html +=     attrs.id ? ' id="' + attrs.id + '"' : '';
    html +=     attrs.name ? ' name="' + attrs.name + '"' : '';
    html +=     attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
    html +=     ' style="display:none" />';
    html +=     '<span class="switch-text">'; /*adding new container for switch text*/
    html +=     attrs.on ? '<span class="on">'+attrs.on+'</span>' : ''; /*switch text on value set by user in directive html markup*/
    html +=     attrs.off ? '<span class="off">'+attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
    html += '</span>';
    return html;
  };

  var link = function (scope, element, attrs) {
    if (attrs.hasOwnProperty('onValue')) {
      scope.onValue = $parse(attrs.onValue)(scope);
    } else {
      scope.onValue = true;
    }
    if (attrs.hasOwnProperty('offValue')) {
      scope.offValue = $parse(attrs.offValue)(scope);
    } else {
      scope.onValue = false;
    }
  };

  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '=',
      ngChange: '&'
    },
    template: template,
    link: link
  }
}]);
