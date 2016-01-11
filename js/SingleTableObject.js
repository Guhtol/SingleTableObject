var Table = (function () {

    var tr = {},
        td = {},
        trFragment = {},
        tdFragment = {};

    var len,
        i,
        nameProperty,
        index,
        oneObject = 1;


    InnerTable.prototype.addObject = appendTable;

    return InnerTable;

    function InnerTable(idTable) {
        if (this instanceof InnerTable) {
            
            //When start aplication get the table.
            this.tableHtml = document.getElementById(idTable);
            
            this.tbodyHtml = this.tableHtml.getElementsByTagName('tbody')[0];
            
            this.theadHtml = this.tableHtml.getElementsByTagName('thead')[0];
        } else {
            return new InnerTable(idTable);
        }
    };

    function appendTable(object) {
        i = 0;

        len = object.length;

        trFragment = document.createDocumentFragment();

        tdFragment = document.createDocumentFragment();
         
        //if object it's not array do this.
        if (len === undefined) {
            
            setSingleObject(object);
           
            setElementTr();
        }
        // if object is array 
        while (i < len) {
            
            
            setArrayObject(object, i);
            
            setElementTr();
            i++;
        }

        this.tbodyHtml.appendChild(trFragment);
    };
    function setSingleObject(object) {
        for (property in object) { 
            
            //create a element td and append in tdFragment           
            setElementTd(property, object);
        }
    };
    function setArrayObject(object, index) {       
        for (property in object[index]) {
            
            //create a element td and append in tdFragment 
            setElementTd(property, object[index]);
        }
    };
    function setElementTd(property, object) {
        
        //Get only property from object, ignore prototype.
        if (object.hasOwnProperty(property)) {
            
            td = document.createElement('td');
            
            // it's possible append object javascript.
            switch (typeof object[property]) {
                case 'object':
                    td.appendChild(object[property]);
                    break;
                default:
                    td.textContent = object[property].toString();
                    break;
            }            
            tdFragment.appendChild(td);
        }
    };
    function setElementTr() {
        tr = document.createElement('tr');
        tr.appendChild(tdFragment);
        trFragment.appendChild(tr);
    };
})();

