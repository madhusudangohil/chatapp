(function(window, angular, undefined){
    angular.module('chatapp')
    .controller("chatCtrl", ['$rootScope', '$scope',function($rootScope, $scope){
        var vm = this;
        var socket = window.io("http://localhost:3000");
        socket.emit("test", "we are passing in a message");
        vm.newMessage = undefined;
        vm.username= undefined;
        vm.messages = [];
        vm.users = [];
        socket.on("receive-message", function(msg){
            console.log("recieved message ");
            $scope.$apply(function(){
                     vm.messages.push(msg);
            })
           
        });

        socket.on("users", function(data){
            $scope.$apply(function(){
                console.log("onusers: " + data);
                     vm.users.push(data);
            })
        });
       

        vm.createUser = function(username){          
            $rootScope.$emit('new-user', username);            
            vm.username = username;

            var newMessage = {
                username: vm.username,
                userId: socket.id
            };
            console.log(vm.username);
            console.log(socket.id);
            socket.emit("setUser", newMessage);
        }

        vm.sendMessage = function(){
            var newMessage = {
                username: vm.username,
                message: vm.newMessage
            };

            socket.emit("new-message", newMessage);
            vm.newMessage = undefined;        
        };


        $rootScope.$on('new-user', function(event, username){
            console.log('this is working' + username);
            vm.username = username;
        });

        $scope.$watch(function(){
            return vm.username;
        }, function(){
            console.log("this is the value for user name",vm.username);
        });

    }]);
})(window, window.angular);