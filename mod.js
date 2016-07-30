// need fs for performming file management
var fs = require('fs');

//to read the file
var input = fs.createReadStream('files/table.csv');

//read line by lne and pass input to interface
 var rl = require('readline').createInterface({
  input:input
 });

 //WriteStream Creation
  var output = fs.createWriteStream('new1.json');
  var output2 = fs.createWriteStream('new2.json');
  var output3= fs.createWriteStream('new3.json');

  //Function for first graph
  function FirstGraph(countryName,population)
  {
    this.countryName =countryName;
    this.population =population;
  };
  //Function for second graph
  function SecondGraph(countryName,gdp)
  {
    this.countryName =countryName;
    this.gdp =gdp;
  };
  //Function for third graph
  function ThirdGraph(countryName,purchase)
  {
    this.countryName =countryName;
    this.purchase =purchase;
  };
  var jsArray=[]; //1st json values
  var jsArray2=[];
  var jsArray3=[];
  var count=0;
  var popIndex,countryIndex,gdpIndex,purchaseIndex;//to get the index values of particular headers


         rl.on('line', function (line) {
         if(count==0){
         var headers=line.split(",");
         popIndex = headers.indexOf("Population (Millions) - 2013");
         countryIndex = headers.indexOf("Country Name");
         gdpIndex=headers.indexOf("GDP Billions (US$) - 2013");
         purchaseIndex=headers.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2013");
         count=1;
       }
       else
       {
         var result1='';
         var result2='';
         var result3='';
         var lineInfo=line.split(",");
         //console.log(lineInfo);
         if(lineInfo[countryIndex]!='European Union' && lineInfo[countryIndex]!='World'){ //to check for the particular countries
             result1 = new FirstGraph(lineInfo[countryIndex],lineInfo[popIndex]);
             result2 =new SecondGraph(lineInfo[countryIndex],lineInfo[gdpIndex]);
             result3 =new ThirdGraph(lineInfo[countryIndex],lineInfo[purchaseIndex]);

               } //END OF IF
               //to remove the empty values
           if(result1.length!=0){
           jsArray.push(result1);
         }
         if(result2.length!=0){
         jsArray2.push(result2);
       }
       if(result3.length!=0){
       jsArray3.push(result3);
     }
         }
       }); //END OF LINE()

       rl.on('close', function() {
         for(var i=0;i<jsArray.length;i++){
               for(var j=i+1;j<jsArray.length;j++){
                      if((parseFloat(jsArray[i].population,10))>(parseFloat(jsArray[j].population,10))){
                           var temp=jsArray[i];
                           jsArray[i]=jsArray[j];
                           jsArray[j]=temp;
                       }
                   }
               }
              console.log(jsArray);
       output.write(JSON.stringify(jsArray.reverse())); //to get in descending order
     });

   rl.on('close', function() {
       for(var i=0;i<jsArray2.length;i++){
             for(var j=i+1;j<jsArray.length;j++){
                    if((parseFloat(jsArray2[i].gdp,10))>(parseFloat(jsArray2[j].gdp,10))){
                         var temp=jsArray2[i];
                         jsArray2[i]=jsArray2[j];
                         jsArray2[j]=temp;
                     }
                 }
             }

            console.log(jsArray2);
       output2.write(JSON.stringify(jsArray2.reverse()));
        });

      rl.on('close', function() {
       for(var i=0;i<jsArray3.length;i++){
             for(var j=i+1;j<jsArray3.length;j++){
                    if((parseFloat(jsArray3[i].purchase,10))>(parseFloat(jsArray3[j].purchase,10))){
                         var temp=jsArray3[i];
                         jsArray3[i]=jsArray3[j];
                         jsArray3[j]=temp;
                     }
                 }
             }
             console.log(jsArray3);
       output3.write(JSON.stringify(jsArray3.reverse())); //to get json values in descending value
  });
