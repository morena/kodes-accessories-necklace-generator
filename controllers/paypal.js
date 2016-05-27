var express = require('express'),
    app = express(),
    paypalSDK = require("paypal-rest-sdk");

exports.init = function(req, res){
  paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AXRmr1m0oIsmDZ-g20-9gwyBXCEpA3wHhKS295gsrZnF1voi6hiaDY5QvnfALDuwKQKNna148hJIqp-H',
        'client_secret': 'EEtcIO4b2HexsqeoogqWvT9as5Cp9bz3WrBJ9l6f622mTsLcUuDC-3rYQ9OylZCT543iwOjwXu_XLN-s'
      });
}
