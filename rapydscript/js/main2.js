(function(){
    function enumerate(item) {
        var arr = [];
        for (var i = 0; i < item.length; i++) {
            arr[arr.length] = [i, item[i]];
        }
        return arr;
    }
    var progress, annual, current;
    BaseChart = function(){
        var self = this;
        self.value = null;
    };
    BaseChart.prototype = new Object();
    BaseChart.prototype.constructor = BaseChart;
    BaseChart.prototype.render = function(dom_id){
        var self = this;
        var c;
        c = new Chart(document.getElementById(dom_id).getContext("2d"));
        return c[self.renderer](self.formatted_data());
    };

    DoughnutChart = function(max){
        var self = this;
        BaseChart.prototype.constructor.call(self);
        self.max = max;
        self.renderer = "Doughnut";
    };
    DoughnutChart.prototype = new BaseChart();
    DoughnutChart.prototype.constructor = DoughnutChart;
    DoughnutChart.prototype.formatted_data = function(){
        var self = this;
        return [ {
            "value": self.value,
            "color": "#99cc64"
        }, {
            "value": self.max - self.value,
            "color": "#E2EAE9"
        } ];
    };

    LineChart = function(){
        var self = this;
        BaseChart.prototype.constructor.call(self);
        self.labels = [];
        self.renderer = "Line";
    };
    LineChart.prototype = new BaseChart();
    LineChart.prototype.constructor = LineChart;
    LineChart.prototype._extract = function(d){
        var self = this;
        return (function() {
            var _$rapyd$_Iter = enumerate(d), _$rapyd$_Result = [], i, v;
            for (var _$rapyd$_Index = 0; _$rapyd$_Index < _$rapyd$_Iter.length; _$rapyd$_Index++) {
                _$rapyd$_Unpack = _$rapyd$_Iter[_$rapyd$_Index];
                i = _$rapyd$_Unpack[0];
                v = _$rapyd$_Unpack[1];
                if (i % 4 == 0) {
                    _$rapyd$_Result.push(v);
                }
            }
            return _$rapyd$_Result;
        })();
    };
    LineChart.prototype.formatted_data = function(){
        var self = this;
        return {
            "labels": self._extract(self.labels),
            "datasets": [ {
                "fillColor": "rgba(140,200,60,0.5)",
                "strokeColor": "rgba(140,200,60,1)",
                "pointColor": "rgba(140,200,60,1)",
                "pointStrokeColor": "#fff",
                "data": self._extract(self.value)
            } ]
        };
    };

    progress = new LineChart();

    progress.labels = [ "08/02/12", "10/02/12", "12/02/12", "14/02/12", "19/02/12", "20/02/12", "22/02/12", "18/03/12", "27/03/12", "30/03/12", "05/04/12", "10/04/12", "15/04/12", "15/04/12", "20/04/12", "02/05/12", "03/05/12", "09/05/12", "15/05/12", "29/05/12", "06/06/12", "18/06/12", "22/06/12", "25/06/12", "26/06/12", "03/07/12", "12/07/12", "23/07/12", "06/08/12", "12/08/12", "14/08/12", "18/08/12", "31/08/12", "02/09/12", "03/09/12", "07/09/12", "12/09/12", "16/09/12", "18/09/12", "23/09/12", "23/09/12", "23/09/12", "10/10/12", "16/10/12", "27/10/12", "28/10/12", "29/10/12", "06/11/12", "11/11/12", "12/11/12", "13/11/12", "15/11/12", "18/11/12", "22/11/12", "29/11/12", "03/12/12", "05/12/12", "16/12/12", "21/12/12", "11/01/13", "14/01/13", "22/01/13", "31/01/13", "04/02/13", "12/02/13", "19/02/13", "25/02/13", "07/03/13", "12/03/13", "15/03/13", "16/03/13", "01/04/13", "11/04/13", "16/04/13", "21/04/13", "29/04/13", "30/04/13", "07/05/13", "08/05/13", "12/05/13", "17/05/13", "28/05/13" ];

    progress.value = [ "", "", "", "", "", "", "", "", "", "1.6", "", "2.5", "", "", "", "", "", "", "", "", "", "1.8", "21.8", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "1.5", "", "", "", "", "42.8", "", "4", "", "", "", "", "", "10", "", "", "" ];

    progress.render("progress");

    annual = new DoughnutChart(400);

    annual.value = 260;

    annual.render("annualweightCanvas");

    current = new DoughnutChart(35);

    current.value = 10;

    current.render("currentweightCanvas");
})();