
import "../src/App.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';


function App() {
  const [currentAge, setCurrentAge] = useState(35); 
  const [annualPreTaxIncome, setAnnualPreTaxIncome] = useState(60000);
  const [retirementSavings, setRetirementSavings] = useState(30000);
  const [monthlyContribution, setMonthlyContribution] = useState(500); 
  const [monthlyBudget, setMonthlyBudget] = useState(2561);
  const [otherRetirement, setOtherRetirement] = useState(0);
  const [retirementAge, setRetirementAge] = useState(67); 
  const [lifeExpectancy, setLifeExpectancy] = useState(95);
  const [preRetirement, setPreRetirement] = useState(6);
  const [postRetirement, setPostRetirement] = useState(5); 
  const [inflationRate, setInflationRate] = useState(3);
  const [annualIncomeIncrease, setAnnualIncomeIncrease] = useState(2);

  const data = {
    labels: ['2022', '2023', '2024', '2025', '2026', '2027'],
    datasets: [
      {
        label: "Empfohlen",
        data: [0, 1, 2, 3, 4, 6],
                        backgroundColor: ['#4898FF'],
                        borderColor: '#4898FF',
                        showLine: true,
                        fill: true,
                        pointRadius: 0,
                        lineTension: 0,
                        interpolate: true,
                        Tooltip: true,
                        Legend:true
                    }, 
                    {
                        label: "Aktueller Plan",
                        data: [6, 5, 4, 3, 2, 1],
                        backgroundColor: ['#88DD9B'],
                        borderColor: '#88DD9B',
                        showLine: true,
                        fill: false,
                        pointRadius: 0,
                        lineTension: 0,
                        interpolate: true,
                        Tooltip: true,
                        Legend: true
                    }]

  };

  const [dataObject, setDataObject] = useState(data);

  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

  useEffect(() => {


    
    console.log("current age value",currentAge);
    console.log("annual tax income",annualPreTaxIncome)

    var obj = {};

  //   document.querySelectorAll('.chd-hasTooltip').forEach(function(element) {
  //     element.addEventListener('click', function(event) {
  //        console.log("clicked i");
  //        event.stopPropagation();
  //     });
  // });

    obj = {
      currentAge,
      annualPreTaxIncome,
      retirementSavings,
      monthlyContribution,
      monthlyBudget,
      otherRetirement,
      retirementAge,
      lifeExpectancy,
      preRetirement,
      postRetirement,
      inflationRate,
      annualIncomeIncrease,
  };

    function addCommas(nStr) {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
  }
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            function xi(t, e, n, d, i) {
                var a = n;
                return n === d && (a = n + 1e-9),
                    (t - e * Math.pow(1 + n, i)) * (a - d) / (Math.pow(1 + a, i) - Math.pow(1 + d, i))
            }

            let func1 = function (t, e, n, r, i, a) {
              for (var o = t, u = 12 * e, _ = [], x = 0; x < n; x++) {
                  var l = o * r
                      , obj = {
                          age: a + x,
                          ending_balance: o,
                          contribution: u,
                          investment_growth: l
                      };
                  o += u + l;
                      obj.ending_balance = o;
                      _.push(obj);
                      u *= 1 + i;
              }
              return _;
          }

          let func2 = function (t, e, n, r, i, a, o) {
            for (var _ = [], s = a - o + 1, c = t, l = 12 * r, f = e, x = 0; x < s; x++) {
                var h = c * n
                    , obj = {
                        age: o + x,
                        starting_balance: c,
                        withdrawal: l,
                        ending_balance: Math.max(0, c - l + h + f),
                        investment_growth: h
                    };
                _.push(obj);
                    l *= 1 + i;
                    f *= 1 + i;
                    c = obj.ending_balance;
            }
            return _;
        }

        let func3 = function (t, e, n, r, i) {
          let ar = arguments;
          for (var a = ar.length > 5 && void 0 !== ar[5] ? ar[5] : 0, _ = [], u = 0, s = i - r, x = 0; x < s + 1; x++) {
              var l = t * Math.pow(1 + e, s - x)
                  , f = a * Math.pow(1 + e, s - x)
                  , d = (u + l - f) / (1 + n)
                  , h = d * n
                  , obj = {
                      age: i - x,
                      starting_balance: d,
                      withdrawal: l,
                      ending_balance: u,
                      investment_growth: h
                  };
              _.push(obj);
                  u = d;
          }
          return _.sort((function (x, y) {
              return x.age - y.age;
          }
          )),
              _
      }

      let func4 = function (t, e, n, r, i, a) {
        for (var o = a - i, _ = [], s = xi(e, t, n, r, o), c = t, x = 0; x < o; x++) {
            var f = c * n
                , obj = {
                    age: i + x,
                    starting_balance: c,
                    withdrawal: 0,
                    ending_balance: c + s + f,
                    investment_growth: f
                };
            _.push(obj);
                c = obj.ending_balance;
                s *= 1 + r;
        }
        return _;
    }

      function calculate(obj) {
        var n = obj.currentAge;
        var r = obj.retirementSavings;
        var a = obj.monthlyContribution;
        var o = obj.monthlyBudget;
        var u = obj.otherRetirement;
        var s = obj.retirementAge;
        var c = obj.lifeExpectancy;
        var l = obj.preRetirement / 100;
        var f = obj.postRetirement / 100;
        var d = obj.inflationRate / 100;
        var h = obj.annualIncomeIncrease / 100;
        var p = s - n;

        console.log("p value", p);

        // debugger
    
        var f1 = func1(r, a, p >= 0 ? p : 32, l, h, n);
        debugger

        // console.log("f1 length",f1.length -);
        var m = f1[f1.length - 1].ending_balance > 0 ? f1[f1.length - 1].ending_balance : 0;
       
        console.log("f1[f1.length - 1] ending_balance",f1[f1.length - 1].ending_balance);
        var v = o * Math.pow(1 + d, p);
        var y = 12 * u * Math.pow(1 + d, p);
        var f2 = func2(m, y, f, v, d, c, s);

        console.log("f2 length",f2.length);
        var endingBalanceZero = f2.find(obj => obj.ending_balance <= 0);
        var _ = endingBalanceZero ? endingBalanceZero.age : null;
        
        
        var f3 = func3(12 * v, d, f, s, c, y);
    
        // debugger 
        var S = f3[0].starting_balance;
        // debugger
    
        var f4 = func4(r, S, l, h, n, s);

        // console.log(r, S, l, h, n, s);
        // debugger

        return {
            years_retirement: p,
            total_retirement_savings: m,
            total_retirement_savings_rec: S,
            monthly_contribution: a,
            monthly_contribution_rec: xi(S, r, l, h, p) / 12,
            age_savings_run_out: _,
            age_savings_run_out_rec: c,
            data: {
                current: [].concat(f1, f2),
                rec: [].concat(f4, f3)
            }
        };
    }
    

  String.prototype.changeDecimal = function() {
    return this.replace(/[,.]/g, function(m) {
        return m === ',' ? '.' : ',';
      });
  };    

      // Populate the object with retrieved values
      var res = calculate(obj);
      console.log("object test",obj);
      console.log('testing in react:', res);

      // console.log("res data current",res.data.current);
      // console.log("res data rec",res.data.rec);

      // Process the result and update the UI
      var current = res.data.current != null || res.data.current > 0 ? res.data.current : 0;
      console.log("res.data.current",res.data.current);
      var rec = res.data.rec != null || res.data.rec > 0 ? res.data.rec : res.data.rec;
      var recomentded = [];
      var currentPath = [];
      var age = [];
      var defe = [];
      current.forEach(function(v, i) {
          currentPath.push(v);
          recomentded.push(rec[i]);
          age.push(v.age);
          defe.push(v.ending_balance - rec[i].ending_balance);
          console.log("v.ending_balance and rec[i].ending_balance", `${v.ending_balance} ${rec[i].ending_balance}`);
      });


      console.log("current path", currentPath);

      data.labels = age;
      data.datasets[0].data = recomentded.map((item) => item.ending_balance);
      data.datasets[1].data = currentPath.map((item) => item.ending_balance)
      setDataObject(data)
      
      console.log("data object line 340: ", data.datasets[0].data.ending_balance);
      console.log("recomentded", data.datasets[0].data);
      console.log("current path: ",currentPath);

    //   jQuery('.chd-hasTooltip').on('click', function () {
    //     // jQuery('.chd-hasTooltip').next().removeClass('active-tooltip')
    //     jQuery(this).next().toggleClass('active-tooltip')
    // })

      // line_chart.data.labels = age;
      //           line_chart.data.datasets[0].data = recomentded;
      //           line_chart.data.datasets[1].data = currentPath;
      //           line_chart.update();

      if (res && res.data && res.data.current && res.data.rec) {
        console.log('Calculation result:', res);
        // Update UI only if calculation was successful
        document.getElementById('retirement-have').textContent = addCommas(res.total_retirement_savings > 0 ? res.total_retirement_savings.toFixed(0) : 0).changeDecimal();
        document.getElementById('retirement-need').textContent = addCommas(res.total_retirement_savings_rec.toFixed(0)).changeDecimal();
        document.getElementById('retirement_savings_cur').textContent = addCommas(res.total_retirement_savings > 0 ? res.total_retirement_savings.toFixed(0) : 0).changeDecimal();
        document.getElementById('monthly_contribution_cur').textContent = addCommas(res.monthly_contribution.toFixed(0)).changeDecimal();
        document.getElementById('age_retirement_savings_cur').textContent = res.age_savings_run_out != null ? res.age_savings_run_out : 80;
        document.getElementById('retirement_savings_tar').textContent = addCommas(res.total_retirement_savings_rec.toFixed(0)).changeDecimal();
        document.getElementById('monthly_contribution_tar').textContent = addCommas(res.monthly_contribution_rec.toFixed(0)).changeDecimal();
        document.getElementById('age_retirement_savings_tar').textContent = addCommas(res.age_savings_run_out_rec.toFixed(0)).changeDecimal();
      } else {
        console.warn('Calculation was not performed due to invalid inputs or other issues.');
      }

  })

  return (
    <div className="container">
      <section className="py-5">
        <div className="card">
          <div className="row">
            <div className="col-md-4">
              <div className="inputSubHeading">
                <div>
                  <h6 className="">GEBEN SIE UNTEN IHRE INFORMATIONEN EIN</h6>
                </div>
              </div>

              <div className="row mt-3">
                {/* <div className="col-lg-12">


                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Aktuelles Alter</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue">i</div>
                          <span className="chd-tooltip">
                            <p>Gib hier dein aktuelles Alter ein.</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div
                          className="input-group-prepend"
                          data-symbol="years"
                        >
                          <input
                            type="text"
                            className="form-control calculate"
                            id="currentAge"
                            value={currentAge}
                            onChange={(e) => {

                              currentAge < retirementAge ? setCurrentAge(e.target.value) : alert('Retirement age cannot be less than current age');

                            }} 
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>


                </div> */}
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Jahreseinkommen vor Steuern</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField" onClick={() => {
                                const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                                tooltipElements.forEach(tooltipElement => {
                                  tooltipElement.addEventListener('click', (event) => {
                                    tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                    console.log("clicked i");
                                    event.stopPropagation();
                                  });
                                });
                          }}>
                          <div className="chd-hasTooltip chd-toltipBlue" >i</div>
                          <span className="chd-tooltip">
                            <p>
                              Gib hier dein aktuelles (Brutto) Jahreseinkommen
                              ein.
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend">
                        <div className="input-wrapper">
    <input
      type="text"
      className="form-control calculate"
      id="annualPreTaxIncome"
      value={annualPreTaxIncome}
      onInput={(e) => setAnnualPreTaxIncome(+e.target.value)}
    />
    <span className="data-symbol">€</span>
  </div>
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Jetztige Rentenersparnisse</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>
                              Hier kannst du mögliche Rentenersparnisse
                              eingeben.
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="retirementSavings"
                            value={retirementSavings}
                            onChange={(e) => setRetirementSavings(+e.target.value)}
                          />
                          <span className="data-symbol">€</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Monatlicher Beitrag input</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }
                          }>i</div>
                          <span className="chd-tooltip">
                            <p>
                              Der Beitrag, den du monatlich für die Rente
                              zurücklegst.
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend" >
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            value={monthlyContribution}
                            onChange={(e) => {
                              const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMonthlyContribution(value);
    } else {
      setMonthlyContribution(''); // or some other fallback value if desired
    }
  }}
                          />
                          <span className="data-symbol">€</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Monatliches Budget im Ruhestand.</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>
                              Frage dich, wieviel Geld du im Ruhestand im Monat
                              benötigst.
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend" data-symbol="€">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="monthlyBudget"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(+e.target.value)}
                          />
                          <span className="data-symbol">€</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Weitere Renteneinkünfte (optional)</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>
                              Hast du später weitere Einnahmen (Miete, Pacht
                              etc.)
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend" >
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="otherRetirement"
                            value={otherRetirement}
                            onChange={(e) => setOtherRetirement(+e.target.value)}
                          />
                          <span className="data-symbol">€</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-12">


                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Renteneintrittsalter</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue">i</div>
                          <span className="chd-tooltip">
                            <p>Wann planst du, in Rente zu gehen?</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div
                          className="input-group-prepend"
                          data-symbol="years"
                        >
                          <input
                            type="text"
                            className="form-control calculate"
                            id="retirementAge"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(+e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                </div> */}
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Lebenserwartung</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>Gib hier deine Lebenserwartung ein.</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div
                          className="input-group-prepend"
                          data-symbol="years"
                        >
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="lifeExpectancy"
                            value={lifeExpectancy}
                            onChange={(e) => setLifeExpectancy(+e.target.value)}
                          />
                          <span className="data-symbol">years</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Rendite im Jahr vor dem Ruhestand</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>Wieviel Rendite erzielst du im Jahr?</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend" data-symbol="%">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="pre_retirement"
                            value={preRetirement}
                            onChange={(e) => setPreRetirement(+e.target.value)}
                          />
                          <span className="data-symbol">%</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Rendite im Jahr nach dem Ruhestand</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>Wieviel Rendite erzielst du im Jahr?</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="post_retirement"
                            value={postRetirement}
                            onChange={(e) => setPostRetirement(+e.target.value)}
                          />
                          <span className="data-symbol">%</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Inflationsrate</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>Gib hier die Inflationsrate ein.</p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="inflationRate"
                            value={inflationRate}
                            onChange={(e) => setInflationRate(+e.target.value)}
                          />
                          <span className="data-symbol">%</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="inputWrap">
                    <span className="form-label-sec d-flex gapingForI">
                      <label >Jährliche Einkommenssteigerung</label>
                      <div className="chd-toltips">
                        <div className="chd-toltipField">
                          <div className="chd-hasTooltip chd-toltipBlue" onClick={() => {
                            const tooltipElements = document.querySelectorAll('.chd-hasTooltip');

                            tooltipElements.forEach(tooltipElement => {
                              tooltipElement.addEventListener('click', (event) => {
                                tooltipElement.nextElementSibling?.classList.toggle('active-tooltip');
                                console.log("clicked i");
                                event.stopPropagation();
                              });
                            });
                          }}>i</div>
                          <span className="chd-tooltip">
                            <p>
                              Hier gibst du deine jährliche Einkommenssteigerung
                              ein.
                            </p>
                          </span>
                        </div>
                      </div>
                    </span>
                    <div className="form-input-sec">
                      <div className="form-group">
                        <div className="input-group-prepend">
                          <div className="input-wrapper">
                          <input
                            type="text"
                            className="form-control calculate"
                            id="annual_income_increase"
                            value={annualIncomeIncrease}
                            onChange={(e) => setAnnualIncomeIncrease(+e.target.value)}
                          />
                          <span className="data-symbol">%</span>
                          </div>
                          
                        </div><br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="marginTopOnMob d-flex displayFlexStyle">
                                    <div>
                                        <div className="mainResult">
                                            <div>
                                                <h1 className="text-center mb-0"><span id="retirement-have">0</span> <span className="numeral-accent">€</span></h1>
                                                
                                            </div>
                                        </div>
                                        <div className="resultLabel">
                                            <div>
                                                <div><i className="fa-solid fa-container-storage"></i>
                                                    <p className="mb-0">Was du jetzt gerade hast</p>
                                                </div>

                                            </div><br></br>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mainResult">
                                            <div>
                                                <h1 className="text-center mb-0"><span id="retirement-need">0</span> <span className="numeral-accent">€</span></h1>
                                            </div>
                                        </div>
                                        <div className="resultLabel">
                                            <div>
                                                <div><i className="fa-solid fa-container-storage"></i>
                                                    <p className="mb-0">Was du brauchen wirst</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-flex displayFlexStyle">
                                    <div>
                                        <div className="headingStyle">
                                            <h4>Aktueller Rentenplan</h4>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Gesamte Rentenersparnisse
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="retirement_savings_cur">0</span>
                                                    <span className="numeral-accent">€</span>
                                                </label>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Montalicher Beitragsss
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="monthly_contribution_cur">0</span>
                                                    <span className="numeral-accent">€</span>
                                                </label>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Alter, in dem deine Ersparnisse sich dem
                                                Ende
                                                neigen
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="age_retirement_savings_cur">0</span>
                                                </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="headingStyle">
                                            <h4>Ziel Rentenplan</h4>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Gesamte Rentenersparnisse
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="retirement_savings_tar">0</span>
                                                    <span className="numeral-accent">€</span>
                                                </label>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Monatlicher Beitrag
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="monthly_contribution_tar">0</span>
                                                    <span className="numeral-accent">€</span>
                                                </label>
                                        </div>
                                        <div className="resultWrap smallCard">
                                            <label style={{fontSize: "15px"}}>Alter, in dem deine Ersparnisse sich dem
                                                Ende
                                                neigen
                                            </label><br></br>
                                            <label><span style={{fontSize: "30px"}}
                                                    id="age_retirement_savings_tar">0</span>
                                                </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardStyle">
                                    <div style={{minWidth: "100px"}} className="" id="tab-1">
                                        <div className="calc-grid-sec">
                                            <div className="calc-chart-sec">
                                                <div className="chartjs-block">
                                                    <Line
                                                    data={dataObject}
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
