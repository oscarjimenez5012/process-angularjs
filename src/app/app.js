(function() {
    'use strict';
    // Set the Angular app.
    angular
        .module('processStreet', [])
        .controller('uploadController', ['$scope', 'CONFIG', '$sce', function ($scope, CONFIG, $sce) {
            $scope.videos = [];
            $scope.progressBar = $(".progressBar");
            $scope.progressStyle = {
                "width": "0%"
            };
            $scope.progress = function (e, data) {
                $scope.$apply(function () {
                    $scope.progressValue = parseInt(data.loaded / data.total * 100);
                    $scope.progressStyle = {
                        "width": $scope.progressValue + "%"
                    };
                })
            };

            $scope.add = function (e, data) {
                if (data.files[0].type.match(/^video\/.*$/)) {
                    $scope.upload = data.submit();
                    $scope.cancelOption = true;
                }
            };
            $scope.done = function (e, data) {


                $scope.$apply(function () {
                    $scope.video = $sce.trustAsResourceUrl("//fast.wistia.net/embed/iframe/"+data.result.hashed_id);
                    $scope.cancelOption = false;
                });
            };
            $scope.cancel = function () {
                $scope.upload.abort();
                $scope.cancelOption = false;
                $scope.progressStyle = {
                    "width": "0%"
                };
            };

            $('.uploader').fileupload({
                url: CONFIG.wistiaUrl,
                formData: {
                    api_password: CONFIG.apiKey
                },
                add: $scope.add,
                done: $scope.done,
                progress: $scope.progress,
                cancel: $scope.cancel
            });
        }])
})();