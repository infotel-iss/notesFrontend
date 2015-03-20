angular.module("notesApp.filters",[]).filter('startFrom', function() {
    return function(input, start) {         
        return (input === undefined)?[]:input.slice(start);
};
});