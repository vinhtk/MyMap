

window.onload = function () {
    MyMap.init.loadMap();
    MyMap.init.eventUser();
};


$(document).ready(function()
{
    MyMap.init.loadDisplay();
});

//My Map Application
var MyMap = {

    map: {},
    objPoint: {},
    infowindow: null,
    //-----------ViewS------------
    Views: {
        createMap: function (mapId) {
            if (!mapId) {
                MyMap.Views.viewError('Map is not have an ID to render');
                return;
            }
            var mapDiv = document.getElementById(mapId);
            var options = {
                center: new vbd.LatLng(10.363554996652653, 106.3641357421875),
                zoom: 5,
                layer: 0,
                backgroundColor: 666,
            }
            var map = new vbd.Map(mapDiv, options)
            return map;
        },
        viewError: function (massage) {           
            document.getElementById('contenterror').innerHTML = massage;
            $('#modalerror').show('normal');
        },
        getData: {
            getUser: function (iduser, username) {
                document.getElementById('profile').innerHTML = " <i class='glyphicon glyphicon- headphones'></i>\
                                                                    Xin chào " + username + " !";


                var info = document.getElementById('card-info');
                info.children[0].innerHTML = username;
                info.children[1].innerHTML = iduser;

            },
            addNotData: function (num, note) {
                var div = document.createElement('div');
                div.className = 'notData';
                div.innerHTML = note;

                if (num === 0) {
                    document.getElementById('addRowPoint').appendChild(div);

                } else {
                    document.getElementById('addRowLine').appendChild(div);
                }

            },
            addRowPoint: function (obj) {

                var id = obj._id;
                var name = obj.NamePoint;
                var address = obj.Address;
                var long = obj.Long;
                var lat = obj.Lat;
                //-------------------------------------cấu trúc Row Point ---------------

                //<div class="list-group-item">
                //    <h5 class="name"><span class="glyphicon glyphicon-map-marker"></span>Tên user đặt</h5>
                //    <p class="adddress">329-333, Lý Thường Kiệt, quận Tân Bình</p>
                //    <div class="btn-list-search">
                //        <a href="#modal-editPoint" data-toggle="modal"><span class="glyphicon glyphicon-pencil"></span></a>
                //        <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                //        <a href="#"><span class="glyphicon glyphicon-share-alt"></span></a>
                //    </div>
                //</div>

                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = id;
                div.innerHTML = "<h5> <span class='glyphicon glyphicon-map-marker'></span>" + name + "</h5>\
                           <p class='address'>"+ address + "</p>\
                                <div class='btn-list-search'></div>" ;

                div.children[0].onclick = function () {
                    MyMap.Controller.ClickOnTap.ClickPointTapSearch(obj);
                }
                var listGroup = document.getElementById('addRowPoint');
                listGroup.appendChild(div);
                //----------button view -----
                var view = document.createElement('a');
                view.innerHTML = "<span id='iconToggle' class='glyphicon glyphicon-map-marker glyphicon-search'></span>";
                view.href = "#";
                view.style.color = '#8a8d93';
                obj.isMarker = false;
                view.onclick = function () {
                    MyMap.Controller.ClickOnTap.ClickIconToggleMarker(obj);
                };

                //----------button edit -----
                var edit = document.createElement('a');
                edit.innerHTML = "<span class='glyphicon glyphicon-pencil'></span>";
                edit.href = "#modal-editPoint";
                edit.setAttribute('data-toggle', 'modal');
                edit.onclick = function () {
                    MyMap.Views.updateData.addModalEditPoint(obj);
                };

                //---------button delete -------
                var del = document.createElement('a');
                del.href = '#';
                del.innerHTML = "<span class='glyphicon glyphicon-trash'> </span>";
                obj.isMarker = false;
                del.onclick = function () {
                    MyMap.Controller.deleteData.deletePoint(obj);
                };

                //-----------button share---------
                var share = document.createElement('a');
                share.href = '#';
                share.innerHTML = "<span class='glyphicon glyphicon-share-alt'></span>";
                share.onclick = function () {

                };
                //appendChild
                div.children[2].appendChild(view);
                div.children[2].appendChild(edit);
                div.children[2].appendChild(del);
                div.children[2].appendChild(share);
            },

            addRowLine: function (obj) {
                var id = obj._id;
                var name = obj.NamePath;
                var point1 = obj.PointPath[0].NamePoint;
                var len = obj.PointPath.length;
                var point2 = obj.PointPath[len - 1].NamePoint;
                //<div class="list-group-item">
                //      <div>
                //        <h5 class="name"><span class="glyphicon glyphicon-map-marker"></span>Tên lộ trình</h5>
                //        <p class="adddress"><i class="glyphicon glyphicon-flag"></i>điểm xuất phát</p>
                //        <p class="adddress"><i class="glyphicon glyphicon-send"></i>Điểm đến</p>
                //     </div>
                //    <div class="btn-list-search">
                //        <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                //        <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                //        <a href="#"><span class="glyphicon glyphicon-share-alt"></span></a>
                //    </div>
                //</div>
                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = id;
                div.innerHTML = "<div><h5> <span class='glyphicon glyphicon-map-marker'></span>" + name + "</h5>\
                           <p class='address'><i class='glyphicon glyphicon-flag'></i>"+ point1 + "</p>\
                            <p class='address'><i class='glyphicon glyphicon-send'></i>"+ point2 + "</p></div>\
                            <div class='btn-list-search'></div>" ;

                var listGroup = document.getElementById('addRowLine');
                listGroup.appendChild(div);
                //Click div_name Event
                div.children[0].onclick = function () {
                    if ($(this).parent().hasClass('active')) {
                        $(this).parent().removeClass('active');
                        $('#addRowLine #radio-group-ilist').slideToggle();
                        MyMap.Views.getData.removeAllLine();
                        MyMap.Views.getData.removeAllMarker();
                    } else {
                        $(this).parent().hide('normal')
                        $(this).parent().parent().prepend($(this).parent());
                        $(this).parent().slideToggle();
                        $('#addRowLine .list-group-item').removeClass('active');
                        $('#addRowLine #radio-group-ilist').remove();
                        $(this).parent().addClass('active');
                        $(this).parent().after('<div id="radio-group-ilist"><div id= "div-radio-transport"></div><div id="listGuide" class="list-group"></div></div>')                        

                        var radio = document.createElement('div');
                        radio.innerHTML = '<div id="radio-transport">\
                            <label for="radio-driving" class="material-icons" id="driving">\
                                 <input type="radio" name="mode" id="radio-driving" value="driving" checked />\
                                 <span>&#xE531;</span></label >\
                                    <label for="radio-cycling" class="material-icons" name ="Xe máy">\
                                        <input type="radio" name="mode" id="radio-cycling" value="cycling" />\
                                        <span>&#xE52F;</span></label>\
                                            <label for="radio-walking" class="material-icons" name="Đi bộ">\
                                                <input type="radio" name="mode" id="radio-walking" value="walking" />\
                                                <span>&#xE536;</span></label>\
                            </div>'
                        document.getElementById('div-radio-transport').appendChild(radio);
                        $('#listGuide').css('display', 'none');
                        $('#radio-transport input').click(function () {
                            MyMap.Controller.getData.drawLine(obj);
                        })
                        $("#radio-driving").click();
                    }
                    //hide div Edit
                    $('#editLine').hide('normal');
                };
                //Button Edit
                var edit = document.createElement('a');
                edit.innerHTML = "<span class='glyphicon glyphicon-pencil'></span>";
                edit.href = "#";
                $(edit).click(function () {
                    MyMap.Views.updateData.addModalEditLine(obj);

                    $(this).parent().parent().addClass('active').siblings().removeClass('active');
                    $('#addRowLine #listGuide').hide();
                    MyMap.Views.getData.removeAllLine();
                    MyMap.Views.getData.removeAllMarker();
                });
                //Button delete
                var del = document.createElement('a');
                del.href = '#';
                del.innerHTML = "<span class='glyphicon glyphicon-trash'> </span>";
                del.onclick = function () {
                    if ($(this).parent().parent().hasClass('active')) {
                        $('#addRowLine #listGuide').slideToggle();
                        MyMap.Views.getData.removeAllLine();
                        MyMap.Views.getData.removeAllMarker();
                    }
                    MyMap.Controller.deleteData.deleteLine(obj);
                };

                //Button share
                var share = document.createElement('a');
                share.href = '#';
                share.innerHTML = "<span class='glyphicon glyphicon-share-alt'></span>";
                share.onclick = function () {

                };

                

                div.children[1].appendChild(edit);
                div.children[1].appendChild(del);
                div.children[1].appendChild(share);
                //div.children[2].appendChild(radio);
            },
            drawLine: function (id, path) {
                var polyline = new vbd.Polyline({
                    path: path, strokeOpacity: 0.5, strokeWidth: 5, drawArrows: true
                });
                polyline.id = id;
                polyline.setMap(MyMap.map);
                MyMap.Models.getData.Line.push(polyline);
            },
            removeAllLine: function () {
                if (MyMap.Models.getData.Line.length > 0) {
                    for (var i = 0; i < MyMap.Models.getData.Line.length; i++) {
                        MyMap.Models.getData.Line[i].setMap();
                    }
                    MyMap.Models.getData.Line = [];
                }

            },
            viewMarker: function (num, position, bool) {
                MyMap.Views.findPath.removeMarker(num);
                var size = new vbd.Size(20, 34);
                var iconB = new vbd.Icon({ size: size, url: 'http://developers.vietbando.com/Images/red_markers_A_J2.png', origin: new vietbando.Point(0, -34) });
                var iconA = new vbd.Icon({ size: size, url: 'http://developers.vietbando.com/Images/red_markers_A_J2.png', origin: new vietbando.Point(0, 0) });
                var sizeIcon = new vbd.Size(10, 10);
                var anchor = new vbd.Point(5, 5);
                var icon = new vbd.Icon({ size: sizeIcon, url: 'images/circle.gif', anchor: anchor });
                if (num === 0) {
                    var marker = new vbd.Marker({
                        position: position,
                        icon: iconA
                    });
                    if (bool) {
                        marker.setDraggable(true);
                    }
                    marker.id = num;                    
                    vbd.event.addListener(marker, 'drag', function (param) {                        
                        var position = marker.getPosition();
                        MyMap.Models.updateData.Points[num][0] = position;
                        var Path = [];
                        for (var i = 0; i < MyMap.Models.updateData.Points.length; i++) {
                            for (var j = 0; j < MyMap.Models.updateData.Points[i].length; j++) {
                                Path.push(MyMap.Models.updateData.Points[i][j]);
                            }
                        }
                        MyMap.Controller.updateData.findSortPath(Path);
                    });
                    vbd.event.addListener(marker, 'dragend', function (param) {
                        var position = marker.getPosition();
                        MyMap.Controller.updateData.whatHere(num, position);
                    });
                    MyMap.Models.getData.Marker.push(marker);
                    marker.setMap(MyMap.map);

                } else if (num === 1) {
                    var marker = new vbd.Marker({
                        position: position,
                        icon: iconB
                    });
                    if (bool) {
                        marker.setDraggable(true);
                    }
                    vbd.event.addListener(marker, 'drag', function (param) {
                        var position = marker.getPosition();
                        MyMap.Models.updateData.Points[MyMap.Models.updateData.Points.length - 1][0] = position;
                        var Path = [];
                        for (var i = 0; i < MyMap.Models.updateData.Points.length; i++) {
                            for (var j = 0; j < MyMap.Models.updateData.Points[i].length; j++) {
                                Path.push(MyMap.Models.updateData.Points[i][j]);
                            }
                        }
                        MyMap.Controller.updateData.findSortPath(Path);
                    });
                    vbd.event.addListener(marker, 'dragend', function (param) {
                        var position = marker.getPosition();
                        MyMap.Controller.updateData.whatHere(num, position);
                    });
                    marker.id = num;
                    MyMap.Models.getData.Marker.push(marker);
                    marker.setMap(MyMap.map);

                } else {
                    var marker = new vbd.Marker({
                        position: position,
                        icon: icon
                    });
                    if (bool) {
                        marker.setDraggable(true);
                    }
                    vbd.event.addListener(marker, 'drag', function (param) {
                        var position = marker.getPosition();
                        MyMap.Models.updateData.Points[num - 1][0] = position;
                        var Path = [];
                        for (var i = 0; i < MyMap.Models.updateData.Points.length; i++) {
                            for (var j = 0; j < MyMap.Models.updateData.Points[i].length; j++) {
                                Path.push(MyMap.Models.updateData.Points[i][j]);
                            }
                        }
                        MyMap.Controller.updateData.findSortPath(Path);
                    });
                    vbd.event.addListener(marker, 'dragend', function (param) {
                        var position = marker.getPosition();
                        MyMap.Models.updateData.Points[num - 1][0] = position;
                    });
                    marker.id = num;
                    MyMap.Models.getData.Marker.push(marker);
                    marker.setMap(MyMap.map);
                }

            },
            removeAllMarker: function (idMarker) {
                for (var i = 0; i < MyMap.Models.getData.Marker.length; i++) {
                    MyMap.Models.getData.Marker[i].setMap();
                }
                MyMap.Models.getData.Marker = [];
            },
            insertGuide: function (dir, name, distance, start, path) {
                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = start;
                div.onmouseenter = function () {
                    MyMap.Views.getData.viewStartMarker(this.id, path);
                }
                div.onmouseleave = function () {
                    MyMap.Views.getData.removeDirMarKer();
                }
                div.innerHTML = '<div><span class="glyphicon glyphicon-map-marker"></span>' + dir + ' <i>' + name + '</i></div>';
                document.getElementById('listGuide').appendChild(div);

            },
            viewStartMarker: function (start, path) {
                MyMap.Views.getData.removeDirMarKer();
                var position = path[start];
                var size = new vbd.Size(10, 10);
                var anchor = new vbd.Point(5, 5);
                var icon = new vbd.Icon({ size: size, url: 'images/blink.gif', anchor: anchor });
                var marker = new vbd.Marker({
                    position: position,
                    icon: icon
                });
                marker.setMap(MyMap.map);
                MyMap.Models.getData.dirMarKer[0] = marker;
            },
            removeDirMarKer: function () {
                if (MyMap.Models.getData.dirMarKer.length > 0) {
                    MyMap.Models.getData.dirMarKer[0].setMap();
                    MyMap.Models.getData.dirMarKer = [];
                }
            },
        },

        updateData: {
            //Insert Form Modal Update Point
            addModalEditPoint: function (obj) {
                var name = document.getElementById('nameModalEditPoint');
                var address = document.getElementById('addressModalEditPoint');
                var long = document.getElementById('longModalEditPoint');
                var lat = document.getElementById('latModalEditPoint');
                var info = document.getElementById('infoModalEditPoint');
                name.value = obj.NamePoint;
                address.value = obj.Address;
                long.value = obj.Lg;
                lat.value = obj.Lat;
                info.value = obj.Inform;
                var save = document.getElementById('saveModalEditPoint');
                //save-button event
                save.onclick = function () {
                    MyMap.Controller.updateData.updatePoint(obj);
                }
            },
            //Validation Form Modal Update  ( num =0 --> Point, num #0 --> Line)
            validation_update: function (num, bool, i) {
                if (num === 0) {
                    inputs = document.getElementById('modal-editPoint').getElementsByTagName('input');
                    if (bool) {
                        inputs[i].style.border = '1px solid buttonface';
                        (inputs[i].parentNode).children[2].style.display = 'none';
                    } else {
                        inputs[i].style.border = '1px solid red';
                        (inputs[i].parentNode).children[2].style.display = 'block';
                    }

                } else {
                    inputs = document.getElementById('editLine').getElementsByTagName('input');
                    if (bool) {
                        inputs[i].style.border = '1px solid buttonface';
                        (inputs[i].parentNode.parentNode).children[2].style.display = 'none';
                    } else {
                        inputs[i].style.border = '1px solid red';
                        (inputs[i].parentNode.parentNode).children[2].style.display = 'block';
                    }
                }
            },
            //Display when update success  ( num =0 --> Point, num #0 --> Line)
            Success: function (num) {
                if (num === 0) {
                    document.getElementById('form-edit-point').style.display = 'none';
                    document.getElementById('success-point').style.display = 'block';
                    setTimeout(function () {
                        $('#modal-editPoint').modal('toggle');
                        $('#addRowPoint').children().remove();
                        MyMap.Controller.getData.getAllPoint();
                    }, 1500);
                } else {
                    $('#body-editLine').hide();
                    $('#foot-editLine').hide();
                    $('#success-editLine').show();
                    $('#editLine').removeClass('update');
                    $('#editLine').addClass('normal');
                    setTimeout(function () {
                        $('#editLine').slideToggle('fast');
                        $('#addRowLine').children().remove();
                        MyMap.Controller.getData.getAllLine();
                    }, 1500);
                    MyMap.Views.getData.removeAllLine();
                    MyMap.Views.getData.removeAllMarker();
                }
            },
            //Insert Form Modal Update Line
            addModalEditLine: function (obj) {
                //Display div editLine
                $('#body-editLine').show();
                $('#foot-editLine').show();
                $('#success-editLine').hide();
                $('#editLine').show('slow');
                //Get value data insert  input
                var name = document.getElementById('name-editLine');
                var point1 = document.getElementById('point1-editLine');
                var point2 = document.getElementById('point2-editLine');
                var info = document.getElementById('info-editLine');
                name.value = obj.NamePath;
                point1.value = obj.PointPath[0].NamePoint;
                point2.value = obj.PointPath[obj.PointPath.length - 1].NamePoint;
                MyMap.Models.updateData.Points = [];
                // Push Point data
                for (var i = 0; i < obj.PointPath.length; i++) {
                    var lat = obj.PointPath[i].Lat;
                    var long = obj.PointPath[i].Lg;
                    var point = new vbd.LatLng(lat, long);
                    MyMap.Models.updateData.Points[i] = [];
                    MyMap.Models.updateData.Points[i].push(point);
                }
                //Save Update
                var save = document.getElementById('save-editLine');
                save.onclick = function () {
                    MyMap.Controller.updateData.updateLine(obj);
                }
                //draw Line and Marker, drag marker
                $('#point1-update').click(function () {
                    MyMap.Controller.updateData.updatePointLine();
                    $('#editLine').removeClass('normal');
                    $('#editLine').addClass('update');
                });
                $('#point2-update').click(function () {
                    MyMap.Controller.updateData.updatePointLine();
                    $('#editLine').removeClass('normal');
                    $('#editLine').addClass('update');
                });
                //Close div update
                $('.close-editLine').click(function () {
                    $('#editLine').hide('normal');
                    MyMap.Views.getData.removeAllLine();
                    MyMap.Views.getData.removeAllMarker();
                    $('#editLine').removeClass('update');
                    $('#editLine').addClass('normal');
                })
            }
        },

        deleteData: {
            deleteLine: function (id) {
                document.getElementById(id).remove();
            }
        },
        displayMarker: function (map, lat, lng, id, icon) {
            var icon = icon;
            var marker = new vbd.Marker({
                position: new vbd.LatLng(lat, lng),
                icon: icon,
            });
            marker.id = id;
            marker.setMap(map);
            return marker;
        },
        panToMarker: function (map, lat, lng) {
            map.setZoom(7);
            map.panTo(new vbd.latlng(lat, lng))
        },

        //Init Info Window
        templateContent: function (info) {
            var html = '<div class="inforMarker " style="width:250px">'
                + '<h4 class="Name" class="font-weight-bold" style="margin:auto;">' + info.NamePoint + ' </h4>'
                + '<hr/>'
                + '<div  class="inforMarker-body" style="width:250px;">'
                + '<p class="address"><i class="glyphicon glyphicon-home"></i> ' + info.Address + '</p>'
                + '<p class="Lat"><label>Lat: </label>' + info.Lat + '</p>'
                + '<p class="Lng" ><label>Lng:</label>' + info.Lg + '</p>'
                + '<p class="Comment"> <u>' + info.Inform + '</u> </p>'
                + '</div>'
                + '<hr/>'
                + '<div class="inforMarker-footer">'
                + '<p>Bạn muốn tìm đường?</p>'
                + ' <a class="From" href="#" style="margin-left:30px;"><i class="glyphicon glyphicon-play"></i>Từ Đây </a>'
                + ' <a class="To" href="#" style="margin-left:45px"><i class="glyphicon glyphicon-play"></i>Đến đây</a>'
                + '</div>'
            return html;
        },
        //Display InfoWindow
        displayInfowWindow: function (info, marker, map) {
            var contentShow = MyMap.Views.templateContent(info);
            var infowindow = new vbd.InfoWindow({
                content: contentShow,
            });
            return infowindow;

        },
        searchData: {
            idSave: [],
            idMongo: [],
            Marker: [],
            addItem: function (id_item, obj, id_mongo) {
                var name = obj.Name;
                var address = obj.Number + ', ' + obj.Street + ', ' + obj.Ward + ', ' +
                    obj.District + ', ' + obj.Province;
                // Vòng lặp xử lí chuổi
                while (address.slice(0, 2) == ', ') {
                    address = address.substring(2);
                }
                //Contructor div
                //<div class="list-group-item">
                //    <h5 class="name"><span class="glyphicon glyphicon-map-marker"></span>Công ty Việt Bản Đồ</h5>
                //    <p class="adddress">329-333, Lý Thường Kiệt, quận Tân Bình</p>
                //    <div class="btn-list-search">
                //        <a href="#"><span class="glyphicon glyphicon-heart-empty"></span></a>
                //        <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                //    </div>
                //</div>
                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = id_item;
                div.innerHTML = "<div> <h5> <span class='glyphicon glyphicon-map-marker'></span>" + name + "</h5>\
                                 <p class='address'>"+ address + "</p> </div>\
                                    <div class='btn-list-search'></div>" ;


                var listGroup = document.getElementById('list-search');
                listGroup.appendChild(div);
                var clicked = false;
                div.children[0].onclick = function () {
                    MyMap.Controller.searchData.viewMarker(obj.isMarker, id_item, obj);
                    MyMap.Views.panToMarker(MyMap.map, obj.Latitude, obj.Longitude);
                    clicked = !clicked;
                }
                //button delete
                var del = document.createElement('a');
                del.href = '#';
                del.innerHTML = "<span class='glyphicon glyphicon-trash'> </span>";
                del.onclick = function () {
                    MyMap.Controller.searchData.removeItem(id_item);
                };
                //button save
                var save = document.createElement('a');
                save.href = '#';
                save.innerHTML = "<span class='glyphicon  glyphicon-heart-empty'></span>";
                save.onclick = function () {
                    MyMap.Controller.searchData.saveData(id_item, obj);
                };
                //button forget
                var forget = document.createElement('a');
                forget.href = '#';
                forget.innerHTML = "<span class='glyphicon  glyphicon-heart'></span>";
                forget.onclick = function () {
                    MyMap.Controller.searchData.forgetData(id_item, this)
                };


                //incon warning
                var warning = document.createElement('a');
                warning.href = '#';
                warning.style.display = "none";
                warning.innerHTML = "<span class='glyphicon  glyphicon-star-empty'></span>";
                warning.onclick = function () {

                };
                div.children[1].appendChild(warning);
                div.children[1].appendChild(save);
                div.children[1].appendChild(forget);
                div.children[1].appendChild(del);
                if (id_mongo == '') {
                    save.style.display = 'inline-block';
                    forget.style.display = 'none';
                    forget.id = id_mongo;
                } else {
                    save.style.display = 'none';
                    forget.style.display = 'inline-block';
                    forget.id = id_mongo;
                }
                $('#tab-search .input-group .btn').click();
            },

            removeItem: function (id) {
                document.getElementById(id).remove();
            },
            // Remove All Item in list-group
            removeAllItem: function () {
                var list = document.getElementById('list-search');

                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
            },

            // view Save Success
            saveSuccess: function (id) {
                var item = document.getElementById(id);

                var btn_save = item.children[1].children[1];
                var btn_forget = item.children[1].children[2];
                btn_save.style.display = 'none';

                btn_forget.style.display = 'inline-block';
            },

            //Remove button Remove. add button Save
            forgetSuccess: function (id) {
                var item = document.getElementById(id);
                var btn_save = item.children[1].children[1];
                var btn_forget = item.children[1].children[2];
                btn_save.style.display = 'inline-block';
                btn_forget.style.display = 'none';
            },

            //Pagination
            addPagination: function (num, key) {
                // Remove All Items before Add new Items
                var paginate = document.getElementById('paginate');
                while (paginate.firstChild) {
                    paginate.removeChild(paginate.firstChild);
                }
                MyMap.Views.searchData.idMongo = [];
                MyMap.Views.searchData.idSave = [];
                // Add Pagination (if numberPage > 1)
                if (num > 1) {
                    document.getElementById('pagination').style.display = 'inline-block';
                    //div Counter
                    var div = document.createElement('div');
                    div.className = 'counter';
                    //Button left
                    var left = document.createElement('button');
                    left.className = 'left';
                    left.type = 'button';
                    left.innerHTML = '<i></i><i></i>';
                    //Button right
                    var right = document.createElement('button');
                    right.className = 'right';
                    right.type = 'button';
                    right.innerHTML = '<i></i><i></i>';
                    //AppendChild
                    paginate.appendChild(div);
                    paginate.appendChild(left);
                    paginate.appendChild(right);
                    //Function pagination
                    var pr = document.querySelector('.left');
                    var pl = document.querySelector('.right');
                    pr.onclick = slide.bind(this, -1);
                    pl.onclick = slide.bind(this, 1);
                    var index = 0, total = num;
                    function slide(offset) {
                        index = Math.min(Math.max(index + offset, 0), total - 1);
                        document.querySelector('.counter').innerHTML = (index + 1) + ' / ' + total;
                        pr.setAttribute('data-state', index === 0 ? 'disabled' : '');
                        pl.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
                        var listGroup = document.getElementById('list-search');
                        while (listGroup.firstChild) {
                            listGroup.removeChild(listGroup.firstChild)
                        }
                        MyMap.Controller.searchData.searchAll(key, index + 1);
                    }
                    slide(0);
                } else {
                    document.getElementById('pagination').style.display = 'none';
                    MyMap.Controller.searchData.searchAll(key, 1);
                }


            },

            //AddMarker
            addMarker: function (idMarker, long, lat) {
                MyMap.Views.searchData.removeMarker(idMarker);
                var position = new vbd.LatLng(lat, long);
                var marker = new vbd.Marker({
                    position: position
                });
                marker.id = idMarker;
                MyMap.Views.searchData.Marker.push(marker);
                console.log(MyMap.Views.searchData.Marker);
                marker.setMap(MyMap.map);
                vbd.event.addListener(marker, 'click', function () {
                    MyMap.Views.searchData.removeMarker(marker.id);

                });
            },

            //RemoveMarker
            removeMarker: function (idMarKer) {
                if (MyMap.Views.searchData.Marker.length > 0) {
                    for (var i = 0; i < MyMap.Views.searchData.Marker.length; i++) {
                        if (MyMap.Views.searchData.Marker[i].id == idMarKer) {
                            MyMap.Views.searchData.Marker[i].setMap();
                            MyMap.Views.searchData.Marker.splice(i, 1);
                        }
                    }
                }

            },

            //RemoveAllMarker
            removeAllMarker: function () {
                if (MyMap.Views.searchData.Marker.length > 0) {
                    for (var i = 0; i < MyMap.Views.searchData.Marker.length; i++) {
                        MyMap.Views.searchData.Marker[i].setMap();
                    }
                    MyMap.Views.searchData.Marker = [];
                }
            },
            viewLoading: function () {
                var loading = document.getElementById('loading');
                loading.style.display = 'block';
            },
            hideLoading: function () {
                var loading = document.getElementById('loading');
                loading.style.display = 'none';
            }


        },

        findPath: {
            dirMarKer: [],
            //Pagination search
            addPagination: function (num_page, key, num_point) {
                var paginate = document.getElementById('paginate-find');
                while (paginate.firstChild) {
                    paginate.removeChild(paginate.firstChild);

                }
                // Add Pagination (if numberPage > 1)
                if (num_page > 1) {
                    document.getElementById('pagination-find').style.display = 'inline-block';
                    //div Counter
                    var div = document.createElement('div');
                    div.className = 'counter';
                    //Button left
                    var left = document.createElement('button');
                    left.className = 'left';
                    left.type = 'button';
                    left.innerHTML = '<i></i><i></i>';

                    //Button right
                    var right = document.createElement('button');
                    right.className = 'right';
                    right.type = 'button';
                    right.innerHTML = '<i></i><i></i>';
                    //AppendChild
                    paginate.appendChild(div);
                    paginate.appendChild(left);
                    paginate.appendChild(right);

                    //Function pagination
                    var pr = document.querySelector('.left');
                    var pl = document.querySelector('.right');
                    pr.onclick = slide.bind(this, -1);
                    pl.onclick = slide.bind(this, 1);
                    var index = 0, total = num_page;
                    function slide(offset) {
                        index = Math.min(Math.max(index + offset, 0), total - 1);
                        document.querySelector('.counter').innerHTML = (index + 1) + ' / ' + total;
                        pr.setAttribute('data-state', index === 0 ? 'disabled' : '');
                        pl.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
                        var listGroup = document.getElementById('list-view-searchFind');
                        while (listGroup.firstChild) {
                            listGroup.removeChild(listGroup.firstChild)
                        }
                        MyMap.Controller.findPath.searchAll(key, index + 1, num_point);
                    }
                    slide(0);
                } else {
                    document.getElementById('pagination-find').style.display = 'none';
                    MyMap.Controller.findPath.searchAll(key, 1, num_point);
                }
                $('#view-searchFind').show('normal')
            },

            //Add Item search
            addItem: function (id, obj, num_point) {
                var name = obj.Name;
                var address = obj.Number + ', ' + obj.Street + ', ' + obj.Ward + ', ' +
                    obj.District + ', ' + obj.Province;

                // Vòng lặp xử lí chuổi
                while (address.slice(0, 2) == ', ') {
                    address = address.substring(2);
                }
                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = id;
                div.innerHTML = "<h5> <span class='glyphicon glyphicon-map-marker'></span>" + name + "</h5>\
                                 <p class='address'>"+ address + "</p>";
                div.onclick = function () {
                    MyMap.Controller.findPath.selectItem(obj, num_point);
                }
                var listGroup = document.getElementById('list-view-searchFind');
                listGroup.appendChild(div);
            },

            // Select Item search 
            selectItem: function (num_point, string, position) {
                if (num_point == 0) {
                    var input = document.getElementById('input-fromsearch');
                    input.value = string;
                } else {
                    var input = document.getElementById('input-tosearch');
                    input.value = string;
                }
                //Reset Find Path
                MyMap.Models.findPath.resetAll();
                $('#view-searchFind').hide('fast');
                MyMap.Controller.findPath.findSortPath();
            },

            //Function View Marker
            viewMarker: function (num_point, position) {
                MyMap.Views.findPath.removeMarker(num_point);
                var size = new vbd.Size(20, 34);
                var iconB = new vbd.Icon({ size: size, url: 'http://developers.vietbando.com/Images/red_markers_A_J2.png', origin: new vietbando.Point(0, -34) });
                var iconA = new vbd.Icon({ size: size, url: 'http://developers.vietbando.com/Images/red_markers_A_J2.png', origin: new vietbando.Point(0, 0) });
                if (num_point === 0) {
                    var marker = new vbd.Marker({
                        position: position,
                        icon: iconA
                    });                
                    vbd.event.addListener(marker, 'drag', function (param) {                   
                        var now = new Date();
                        if (typeof (param) != 'undefined') { 
                            position = marker.getPosition();
                            MyMap.Controller.findPath.drawLine(num_point, position, marker.line);
                        }
                    });
                    vbd.event.addListener(marker, 'dragend', function (param) {
                        var position = marker.getPosition();
                        MyMap.Controller.findPath.whatHere(num_point, position);
                    });
                    marker.id = num_point;
                    marker.line = 0;
                    MyMap.Models.findPath.Marker[num_point] = marker;
                    marker.setMap(MyMap.map);
                    marker.setDraggable(true);

                } else {
                    var marker = new vbd.Marker({
                        position: position,
                        icon: iconB
                    });
                    vbd.event.addListener(marker, 'drag', function (param) {
                        if (typeof (param) != 'undefined') {

                            position = marker.getPosition();
                            MyMap.Controller.findPath.drawLine(num_point, position, marker.line);
                        }
                    });
                    vbd.event.addListener(marker, 'dragend', function (param) {
                        var position = marker.getPosition();
                        MyMap.Controller.findPath.whatHere(num_point, position);
                    });
                    marker.id = num_point;
                    marker.line = 0;
                    MyMap.Models.findPath.Marker[num_point] = marker;
                    marker.setMap(MyMap.map);
                    marker.setDraggable(true);
                }
                console.log(MyMap.Models.findPath.Marker);
            },

            //Function Remove Marker
            removeMarker: function (idMarker) {
                for (var i = 0; i < MyMap.Models.findPath.Marker.length; i++) {
                    if (MyMap.Models.findPath.Marker[i] != null) {
                        if (MyMap.Models.findPath.Marker[i].id == idMarker) {
                            MyMap.Models.findPath.Marker[i].setMap();
                        }
                    }
                }
            },

            //Function View Line
            drawLine: function (id, path) {
                var polyline = new vbd.Polyline({
                    path: path, strokeOpacity: 0.5, strokeWidth: 5, drawArrows: true
                });
                vbd.event.addListener(polyline, 'mousemove', function (param) {
                    var position = param.LatLng;
                    MyMap.Views.findPath.removeDirMarKer();
                    MyMap.Views.findPath.viewDirMarker(position, id);
                });
                polyline.id = id;
                vbd.event.addListener(polyline, 'mouseout', function (param) {
                    setTimeout(function () {
                        MyMap.Views.findPath.removeDirMarKer();
                    }, 1000);
                });
                polyline.setMap(MyMap.map);
                MyMap.Models.findPath.Line.push(polyline);
            },

            //Function remove Line
            removeLine: function (id_line) {
                if (MyMap.Models.findPath.Line.length > 0) {
                    for (var i = 0; i < MyMap.Models.findPath.Line.length; i++) {
                        if (MyMap.Models.findPath.Line[i].id == id_line) {
                            MyMap.Models.findPath.Line[i].setMap();
                            MyMap.Models.findPath.Line.splice(i, 1);
                        }
                    }
                }
            },

            //Function remove  All Line
            removeAllLine: function () {
                if (MyMap.Models.findPath.Line.length > 0) {
                    for (var i = 0; i < MyMap.Models.findPath.Line.length; i++) {
                        MyMap.Models.findPath.Line[i].setMap();
                        MyMap.Models.findPath.Line.splice(i, 1);
                    }
                }

            },

            //Function Insert  Guide into Div
            insertGuide: function (dir, name, distance, start, path) {
                var div = document.createElement('div');
                div.className = 'list-group-item';
                div.id = start;
                div.onmouseenter = function () {

                    MyMap.Views.findPath.viewStartMarker(this.id, path);
                }
                div.onmouseleave = function () {
                    MyMap.Views.findPath.removeDirMarKer();
                }
                div.innerHTML = '<div><span class="glyphicon glyphicon-map-marker"></span>' + dir + ' <i>' + name + '</i></div>\
                                        <span class="distance-guide" >'+ distance + 'm' + '</span >';
                document.getElementById('list-guideStreet').appendChild(div);

            },

            //Hover Guide view marker in Line
            viewStartMarker: function (start, path) {
                MyMap.Views.findPath.removeDirMarKer();
                var position = path[start];
                var size = new vbd.Size(10, 10);

                var anchor = new vbd.Point(5, 5);
                var iconA = new vbd.Icon({ size: size, url: 'images/blink.gif', anchor: anchor });
                var marker = new vbd.Marker({
                    position: position,
                    icon: iconA
                });
                marker.setMap(MyMap.map);
                MyMap.Models.findPath.dirMarKer[0] = marker;
            },

            // View Marker when mouseover Line
            viewDirMarker: function (position, num_line) {
                MyMap.Views.findPath.removeDirMarKer();
                var size = new vbd.Size(10, 10);
                var anchor = new vbd.Point(5, 5);
                var icon = new vbd.Icon({ size: size, url: 'images/circle.gif', anchor: anchor });
                var marker = new vbd.Marker({
                    position: position,
                    icon: icon
                });
                //event drag Marker --> Findpath--> draw Line
                vbd.event.addListener(marker, 'drag', function (param) {
                    position = marker.getPosition();
                    MyMap.Controller.findPath.drawLine(2, position, num_line);
                });
                //event click marker --> create Marker point, add new Point in FindPath
                vbd.event.addListener(marker, 'click', function (param) {
                    var position = marker.getPosition();
                    var id = MyMap.Models.findPath.Find.length;
                    position.id = id;
                    MyMap.Models.findPath.Find[num_line].push(position);
                    MyMap.Controller.findPath.findSortPath();
                    MyMap.Views.findPath.viewPointMarker(position, id);
                });
                //event dragend --> get new Position --> FindPath
                vbd.event.addListener(marker, 'dragend', function (param) {
                    var position = marker.getPosition();
                    var id = MyMap.Models.findPath.Find.length;
                    position.id = id;
                    MyMap.Models.findPath.Find[num_line].push(position);

                    MyMap.Controller.findPath.findSortPath();
                    MyMap.Views.findPath.viewPointMarker(position, id);
                });
                marker.setMap(MyMap.map);
                marker.setDraggable(true);
                MyMap.Models.findPath.dirMarKer[0] = marker;

            },

            // View Marker when insert new Point 
            viewPointMarker: function (position, id) {
                var size = new vbd.Size(32, 32);
                var anchor = new vbd.Point(17, 28);
                var icon = new vbd.Icon({ size: size, url: 'images/point.gif', anchor: anchor });
                var addmarker = new vbd.Marker({
                    position: position,
                    icon: icon,
                });
                //Draw Line when drag point  marker 
                vbd.event.addListener(addmarker, 'drag', function (param) {
                    var position = addmarker.getPosition();
                    position.id = id;
                    MyMap.Controller.findPath.drawLine(3, position, id);
                })
                // Get new position --> FindPath
                vbd.event.addListener(addmarker, 'dragend', function (param) {
                    var position = addmarker.getPosition();
                    position.id = id;

                    for (var i = 0; i < MyMap.Models.findPath.Find.length; i++) {
                        for (var j = 0; j < MyMap.Models.findPath.Find[i].length; j++) {
                            if (addmarker.id == MyMap.Models.findPath.Find[i][j].id) {
                                MyMap.Models.findPath.Find[i][j] = position;
                            }
                        }
                    }
                    MyMap.Controller.findPath.findSortPath();
                });
                addmarker.id = id;
                MyMap.Views.findPath.dirMarKer.push(addmarker);
                addmarker.setDraggable(true);
                addmarker.setMap(MyMap.map);
            },

            //Remove Dir marker
            removeDirMarKer: function () {
                if (MyMap.Models.findPath.dirMarKer.length > 0) {
                    MyMap.Models.findPath.dirMarKer[0].setMap();
                    MyMap.Models.findPath.dirMarKer = [];
                }
            },

            // Add id_mongo  for button remove when save success
            saveStreet: function () {
                $('#saveFindStreet').show('normal');
                $('#transporttype').show('normal');                
                var removeStreet = document.getElementsByClassName('removeStreet');
                for (var i = 0; i < removeStreet.length; i++) {
                    removeStreet[i].id = '';
                    removeStreet[i].click();
                }
            }
        },
    },
    //-----------End View---------

    //-----------Models-----------
    Models: {
        ObjectPoints: [],
        Paths: ['', ''],  //path to Find Street
        TyleFT: '', //type Find Street
        markerTap: {
            markerSearch: [],   //array marker of Search
            markerStreet: [],    //array marker of FindStreet
            markerIlist: [],     //array marker of Ilist
        },
        toggleMarkerflag: false,  // toggle for icon Marker

        getData: {
            Path: [],
            inDir: [],
            inName: [],
            inDistance: [],
            inStart: [],
            Line: [],
            Marker: [],
            dirMarKer: [],
            //Get all Point from Database
            getAllPoint: function () {
                MyMapProject.Library.Ajax.Map.FindAllPoints(function (e) {

                    var obj = e.value;
                    if (obj == '') {
                        MyMap.Views.getData.addNotData(0, 'Chưa có điểm nào được lưu!');


                    } else {
                        ObjectPoints = [];
                        for (var i = 0; i < obj.length; i++) {
                            MyMap.Views.getData.addRowPoint(obj[i]);
                            MyMap.Models.ObjectPoints.push(obj[i]);
                        }
                    }

                });
            },
            //Get All Line from Database
            getAllLine: function () {
                MyMapProject.Library.Ajax.Map.FindAllPaths(function (e) {
                    obj = e.value;

                    if (obj == '') {
                        MyMap.Views.getData.addNotData(1, 'Chưa có điểm nào được lưu!');

                    } else {
                        for (var i = 0; i < obj.length; i++) {
                            MyMap.Views.getData.addRowLine(obj[i]);
                        }
                    }
                });
            },
            //Get info User login
            getUser: function () {
                MyMapProject.Library.Ajax.Map.getUser(function (e) {
                    var obj = e.value;
                    var iduser = obj[0]
                    var username = obj[1];
                    MyMap.Views.getData.getUser(iduser, username);
                });
            },
            //Draw Line when click Line
            drawLine: function (obj) {
                var Path = [];
                var num_Marker = 0;
                MyMap.Views.getData.removeAllMarker();
                for (var i = 0; i < obj.PointPath.length; i++) {
                    var lg = obj.PointPath[i].Lg;
                    var lat = obj.PointPath[i].Lat;
                    var point = new vbd.LatLng(lat, lg);
                    Path.push(point);
                    if (i == 0) {
                        num_Marker = 0;
                    } else if (obj.PointPath.length - i == 1) {
                        num_Marker = 1;
                    } else {
                        num_Marker = 2;
                    }
                    MyMap.Views.getData.viewMarker(num_Marker, point);
                }
                var type;
                if (document.getElementById('radio-driving').checked) {
                    type = 2
                } else if (document.getElementById('radio-cycling').checked) {
                    type = 1
                } else {
                    type = 0
                }
                MyMapProject.Library.Ajax.Map.ShortPath(Path, type, function (e) {
                    if (e.value != null) {
                        MyMap.Models.getData.returnStreet(e.value);
                    } else {
                        MyMap.Views.viewError('Không tìm thấy đường. Vui lòng thay đổi vị trí tìm kiếm khác')
                    }
                });
            },
            //process result's Function findSortPath
            returnStreet: function (obj) {
                MyMap.Views.getData.removeAllLine();
                MyMap.Models.getData.resetAll();
                if (obj.FullPath != null) {
                    for (var k = 0; k < obj.FullPath[0].length; k++) {
                        MyMap.Models.getData.Path[k] = [];
                        MyMap.Models.getData.inDir[k] = [];
                        MyMap.Models.getData.inDistance[k] = [];
                        MyMap.Models.getData.inName[k] = [];
                        MyMap.Models.getData.inStart[k] = [];


                        for (var i = 0; i < obj.FullPath[0][k].length; i = i + 2) {
                            var long = obj.FullPath[0][k][i];
                            var lat = obj.FullPath[0][k][i + 1];
                            var point = new vbd.LatLng(lat, long);
                            MyMap.Models.getData.Path[k].push(point);
                        }


                        //Dirs Guide
                        for (var i = 0; i < obj.ResultScript.Leg[k].Step.length; i++) {
                            var num = obj.ResultScript.Leg[k].Step[i].dir;
                            var string;
                            if (num == '0') {
                                string = 'Đi thẳng ';
                            } else if (num == '1') {
                                string = 'Rẻ trái ';
                            } else if (num == '2') {
                                string = 'Rẻ phải ';
                            } else if (num == '3') {
                                string = 'Đi tiếp ';
                            } else if (num == '4') {
                                string = 'Qua'
                            } else if (num == '5') {
                                string = 'Rẻ vào'
                            } else if (num == '6') {
                                string = 'Đến'
                            } else {
                                string = 'Hướng'
                            }
                            MyMap.Models.getData.inDir[k].push(string);
                            MyMap.Models.getData.inDistance[k].push(obj.ResultScript.Leg[k].Step[i].len);
                            MyMap.Models.getData.inName[k].push(obj.ResultScript.Leg[k].Step[i].name);
                            MyMap.Models.getData.inStart[k].push(obj.ResultScript.Leg[k].Step[i].start);
                        };



                        //Draw Line                        
                        MyMap.Views.getData.drawLine(k, MyMap.Models.getData.Path[k]);
                        //Insert Guide

                        for (var i = 0; i < MyMap.Models.getData.inDir[k].length; i++) {
                            var dir = MyMap.Models.getData.inDir[k][i];
                            var name = MyMap.Models.getData.inName[k][i];
                            var len = MyMap.Models.getData.inDistance[k][i];
                            var start = MyMap.Models.getData.inStart[k][i];
                            MyMap.Views.getData.insertGuide(dir, name, len, start, MyMap.Models.getData.Path[k]);
                        }


                    };
                    $('#listGuide').show('slow');
                }
            },
            //Reset Array
            resetAll: function () {
                MyMap.Models.getData.inDistance = [];
                MyMap.Models.getData.inName = [];
                MyMap.Models.getData.inDir = [];
                MyMap.Models.getData.Path = [];
                MyMap.Models.getData.inStart = [];
            },
        },


        //MODEL UPDATE DATA
        updateData: {
            Path: [],
            Points: [],
            //Kiểm tra form trống trước khi Update
            val_updatePoint: function () {
                var result = true;
                var inputs = document.getElementById('modal-editPoint').getElementsByTagName('input');

                for (var i = 0; i < 2; i++) {
                    if (inputs[i].value === '') {
                        result = false;
                        MyMap.Views.updateData.validation_update(0, false, i);

                    } else {
                        for (var j = 0; j < inputs[i].value.split(' ').length; j++) {
                            if (inputs[i].value.split(' ')[j].length > 10) {
                                result = false;
                                MyMap.Views.updateData.validation_update(0, false, i);

                            } else {
                                MyMap.Views.updateData.validation_update(0, true, i);
                            }

                        }

                    }
                }
                return result;
            },

            //Gọi Ajax thực hiện Update
            updatePoint: function (obj) {
                var name = document.getElementById('nameModalEditPoint');
                var address = document.getElementById('addressModalEditPoint');
                var long = document.getElementById('longModalEditPoint');
                var lat = document.getElementById('latModalEditPoint');
                var info = document.getElementById('infoModalEditPoint');
                if (MyMap.Models.updateData.val_updatePoint()) {
                    MyMapProject.Library.Ajax.Map.Update(obj._id, name.value, address.value, info.value, function (e) {
                        if (e.value) {
                            MyMap.Views.updateData.Success(0);
                        }
                    });
                }
            },

            //Kiểm tra form trống trước khi Update Line
            val_updateLine: function () {
                var result = true;
                var inputs = document.getElementById('editLine').getElementsByTagName('input');
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == '') {
                        result = false;
                        MyMap.Views.updateData.validation_update(1, false, i);
                    } else {
                        MyMap.Views.updateData.validation_update(1, true, i);
                    }
                }
                return result;
            },

            //Gọi Ajax thực hiện Update Line
            updateLine: function (obj) {
                var name = document.getElementById('name-editLine');
                var point1 = document.getElementById('point1-editLine');
                var point2 = document.getElementById('point2-editLine');
                //var info = document.getElementById('infoModalEditLine');
                var path = [];
                if (MyMap.Models.updateData.val_updateLine()) {
                    var Points = MyMap.Models.updateData.Points;
                    for (var i = 0; i < Points.length; i++) {
                        for (var j = 0; j < Points[i].length; j++) {
                            if (i == 0) {
                                path.push(point1.value);
                                path.push(Points[i][j].Latitude.toString());
                                path.push(Points[i][j].Longitude.toString());
                            } else if (i == Points.length - 1) {
                                path.push(point2.value);
                                path.push(Points[i][j].Latitude.toString());
                                path.push(Points[i][j].Longitude.toString());
                            } else {
                                path.push(null);
                                path.push(Points[i][j].Latitude.toString());
                                path.push(Points[i][j].Longitude.toString());
                            }
                        }
                    }
                    MyMapProject.Library.Ajax.Map.UpdatePath(name.value, obj._id, path, function (e) {
                        if (e.value != 'fasle') {
                            MyMap.Views.updateData.Success(1);
                        }
                    });
                }

            },

            // Change position PointPath
            updatePointLine: function () {
                var Path = [];
                var num_Marker = 0;
                var Points = MyMap.Models.updateData.Points;
                MyMap.Views.getData.removeAllMarker();
                for (var i = 0; i < Points.length; i++) {
                    for (var j = 0; j < Points[i].length; j++) {
                        Path.push(Points[i][j]);
                        if (i == 0) {
                            num_Marker = 0;
                        } else if (Points.length - i == 1) {
                            num_Marker = 1;
                        } else {
                            num_Marker = i + 1;
                        }
                        MyMap.Views.getData.viewMarker(num_Marker, Points[i][j], true);
                    }
                }
                MyMap.Controller.updateData.findSortPath(Path);
            },

            //FindSortPath when change position PointPath
            findSortPath: function (Path) {
                MyMapProject.Library.Ajax.Map.ShortPath(Path, 1, function (e) {
                    var obj = e.value;
                    if (obj != null && obj.FullPath != null) {
                        MyMap.Views.getData.removeAllLine();
                        for (var k = 0; k < obj.FullPath[0].length; k++) {
                            MyMap.Models.updateData.Path[k] = [];
                            for (var i = 0; i < obj.FullPath[0][k].length; i = i + 2) {
                                var long = obj.FullPath[0][k][i];
                                var lat = obj.FullPath[0][k][i + 1];
                                var point = new vbd.LatLng(lat, long);
                                MyMap.Models.updateData.Path[k].push(point);
                            }
                            //Draw Line                        
                            MyMap.Views.getData.drawLine(k, MyMap.Models.updateData.Path[k]);
                        }
                    } else {
                        MyMap.Views.viewError('Hai vị trí cách quá xa. Không thể tìm thấy dữ liệu. Vui lòng tahy đổi vị trí gần hơn');
                    }
                });
            },

            //WhatHere when change position PointPath
            whatHere: function (num_point, position) {
                MyMapProject.Library.Ajax.Map.WhatHere(position.Longitude, position.Latitude, function (e) {
                    var obj = e.value;
                    if (obj.District == null) {
                        MyMap.Views.viewError('Cảnh báo! Dữ liệu nằm ngoài phạm vi lãng thổ Việt Nam');
                    } else {
                        var string = obj.Ward + ',' + obj.Province + ',' + obj.District;
                        var point = new vbd.LatLng(obj.Latitude, obj.Longitude);
                        point.name = obj.Ward + ',' + obj.Province + ',' + obj.District;

                        //view input update
                        if (num_point == 0) {
                            MyMap.Models.updateData.Points[0][0] = point;
                            var input = document.getElementById('point1-editLine');
                            input.value = string;
                        } else {
                            MyMap.Models.updateData.Points[MyMap.Models.updateData.Points.length - 1][0] = point;
                            var input = document.getElementById('point2-editLine');
                            input.value = string;
                        }
                        //findsortpath and draw line
                        var Path = [];
                        for (var i = 0; i < MyMap.Models.updateData.Points.length; i++) {
                            for (var j = 0; j < MyMap.Models.updateData.Points[i].length; j++) {
                                Path.push(MyMap.Models.updateData.Points[i][j]);
                            }
                        }
                        MyMap.Models.updateData.findSortPath(Path);
                    }
                })
            }
        },

        //Delete line and point
        deleteData: {
            deleteLine: function (obj) {
                var id = obj._id;
                MyMapProject.Library.Ajax.Map.RemovePath(id, function (e) {
                    MyMap.Views.deleteData.deleteLine(id);
                });
            },
            deletePoint: function (obj) {
                $('#addRowPoint .list-group-item').each(function () {
                    var id = $(this).attr('id');
                    if (obj._id === id) {
                        $(this).remove();
                        MyMapProject.Library.Ajax.Map.Remove(id);
                    }
                });
            },
        },

        //Click on Tap
        ClickOnTap: {
            //Tap Search --SearchStreet
            ClickPointTapSearch: function (obj) {
                $('#addRowPoint .list-group-item ').each(function () {
                    var id = $(this).attr('id');
                    if (obj._id === id) {
                        $(this).css('border', "2px solid #cf2e1e");
                        if (obj.isMarker == false) {
                            var marker = MyMap.Views.displayMarker(MyMap.map, obj.Lat, obj.Lg, id);
                            $(this).children().eq(2).children().eq(0).css('color', '#cf2e1e');
                            obj.isMarker = true;
                            //add marker to MarkerIlist
                            MyMap.Models.markerTap.markerIlist.push(marker);
                        }
                        MyMap.Views.panToMarker(MyMap.map, obj.Lat, obj.Lg);
                        MyMap.Controller.ClickOnMap.ClickMarker(marker);
                    }
                    else
                        $(this).css('border', "");
                });
            },
            //User find point on map
            ClickScreenShot: function () {
                $('.btnScreenShot ').click(function () {
                    var test = 0;
                    MyMap.Models.TyleFT = $(this).parents().parents().parents().attr('id');
                    $('.toggle-tabs').click();
                    if (MyMap.Models.TyleFT === 'FromSearch') {
                        $('#map').css('cursor', 'url(images/markerA.png) 10 32, auto');
                    }
                    else {
                        $('#map').css('cursor', 'url(images/markerB.png) 10 32,auto');
                    }
                    vbd.event.addListener(MyMap.map, 'click', function (param) {
                        if (test === 0) {
                            $('#map').css('cursor', '');
                            $('.toggle-tabs').click();
                            $('#' + MyMap.Models.TyleFT + ' .Name').val('Point: ' + param.Point);
                            var LatLng = param.LatLng.toString().split(',');
                            var position = new vbd.LatLng(Number(LatLng[0]), Number(LatLng[1]));
                            test++;
                            //Save LatLng
                            if (MyMap.Models.TyleFT === 'FromSearch') {
                                MyMap.Models.findPath.whatHere(0, position, true);
                                MyMap.Views.findPath.viewMarker(0, position);
                                //MyMap.Models.Paths[0] = param.LatLng.toString();
                            }
                            else {
                                MyMap.Views.findPath.viewMarker(1, position);
                                MyMap.Models.findPath.whatHere(1, position, true);
                                //MyMap.Models.Paths[0] = param.LatLng.toString();
                            }
                        }
                    });

                    vbd.event.addListener(MyMap.map, 'rightclick', function (param) {
                        $('#map').css('cursor', '');
                        $('.toggle-tabs').click();
                    });

                })
            },

            //Icon Toggle Marker
            ToggleMarker: function (obj) {
                var flag = false;
                $('#addRowPoint .list-group-item ').each(function () {
                    var id = $(this).attr('id');
                    if (obj._id === id) {

                        if (flag === false && obj.isMarker === false) {
                            $(this).children().eq(2).children().eq(0).css('color', '#cf2e1e');
                            var marker = MyMap.Views.displayMarker(MyMap.map, obj.Lat, obj.Lg, id);

                            MyMap.Controller.ClickOnMap.ClickMarker(marker);

                            flag = true;
                            obj.isMarker = true;

                            //add to arr Marker Ilist
                            MyMap.Models.markerTap.markerIlist.push(marker);


                        }

                        else {
                            var markerIlist = MyMap.Models.markerTap.markerIlist;
                            for (var i = 0; i < markerIlist.length; i++) {
                                if (markerIlist[i].id == id) {
                                    MyMap.map.removeMarker(markerIlist[i]);
                                }
                            }
                            $(this).children().eq(2).children().eq(0).css('color', '#8a8d93');
                            flag = false;
                            obj.isMarker = false;
                            if (MyMap.infowindow != null) MyMap.infowindow.close();
                        }
                    }
                });
            },
            //Refresh each tap
            Refresh: {

                refTapIlist: function (markerIlist) {
                    var obj = MyMap.Models.ObjectPoints;

                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].isMarker == true)
                            obj[i].isMarker = false;
                    }

                    $('#addRowPoint .list-group-item #iconToggle').each(function () {

                        if ($(this).css('color') == 'rgb(207, 46, 30)') {
                            $(this).click();
                        }
                    });

                    $('#addRowPoint .list-group-item').each(function () {
                        $(this).css('border', '');
                    });

                    for (var i = 0; i < markerIlist.length; i++) {
                        MyMap.map.removeMarker(markerIlist[i]);
                    }

                },


                refTapStreet: function (markerStreet) {
                    //refresh marker
                    for (var i = 0; i < markerStreet.length; i++) {
                        MyMap.map.removeMarker(markerStreet[i]);
                    }

                    //refresh input search
                    $('#FromSearch .Name').val('');
                    $('#ToSearch .Name').val('');


                    ////refresh List guide
                    $('#list-guideStreet .list-group-item').remove();

                    MyMap.Models.findPath.Points = [];


                    if (MyMap.Models.findPath.Line.length > 0) {
                        MyMap.Models.findPath.Line[0].setMap();
                        MyMap.Models.findPath.Line = [];
                    }
                },


                refTapSearch: function (markerSearch) {
                    $('#tab-search .list-group-item').remove();

                    //refresh marker
                    for (var i = 0; i < markerSearch.length; i++) {
                        MyMap.map.removeMarker(markerSearch[i]);
                    }


                },
                refTapIlistLine: function () {
                    MyMap.Views.getData.removeAllLine();
                    MyMap.Views.getData.removeAllMarker();
                    MyMap.Models.getData.Line = [];
                    MyMap.Models.getData.Marker = [];
                    MyMap.Models.getData.dirMarKer = [];
                    $('#listGuide').hide();
                    $('#addRowLine').children().removeClass('active');
                }


            },


        },

        //Click on Map
        ClickOnMap: {
            ClickMarker: function (marker) {
                var inforWindow;
                var count = false;
                vbd.event.addListener(marker, 'click', function () {
                    $('#addRowPoint .list-group-item').each(function () {
                        var id = $(this).attr('id');
                        if (marker.id === id) {
                            $(this).css('border', "2px solid #cf2e1e");
                            $(this).hide().slideToggle();
                            $(this).parent().prepend(this);
                        }
                        else
                            $(this).css('border', "");
                    });
                    var ListPoints = MyMap.Models.ObjectPoints;
                    if (MyMap.infowindow != null) {
                        MyMap.infowindow.close();
                        count = false;
                    }
                    for (var i = 0; i < ListPoints.length; i++) {
                        if (marker.id === ListPoints[i]._id) {
                            if (MyMap.infowindow != null) {
                                var position1 = MyMap.infowindow.getPosition();
                                var position2 = marker.getPosition();
                                if (position1 == position2) {
                                    count = true;
                                }
                            }
                            if (count == false) {
                                inforWindow = MyMap.Views.displayInfowWindow(ListPoints[i], marker, MyMap.map);
                                inforWindow.open(MyMap.map, marker);
                                MyMap.infowindow = inforWindow;
                                break;
                            }
                            else {
                                inforWindow.close(MyMap.map, marker);
                                MyMap.infowindow = null;
                                count = false;
                                break;

                            }
                        }
                    }
                    MyMap.Models.ClickOnMap.ClickFTonInfoW();
                });
            },
            //Search Street ---Click From To on info Window
            ClickFTonInfoW: function () {
                $('.inforMarker-footer a').click(function () {
                    var test = 0;
                    MyMap.Models.TyleFT = $(this).attr('class');
                    var $info = $(this).parent().parent().children();
                    var Name = $info.eq(0).text() + $info.eq(2).children().eq(0).text();
                    var lat = $info.eq(2).children().eq(1).text().slice(5);
                    var long = $info.eq(2).children().eq(2).text().slice(4);
                    var obj = {};
                    obj.Name = Name;
                    obj.Longitude = long;
                    obj.Latitude = lat;
                    $('#btn-toggle-find').click();
                    $('#tab-findStreet .glyphicon-refresh').click();
                    if (MyMap.Models.TyleFT === 'From') {
                        MyMap.Controller.findPath.selectItem(obj, 0);
                    }
                    else {
                        MyMap.Controller.findPath.selectItem(obj, 1);
                    }
                });
            }
        },


        //Search Data
        searchData: {
            //SearchAll 
            searchAll: function (key, page) {
                MyMapProject.Library.Ajax.Map.Search(key, page, function (e) {
                    var obj = e.value;
                    for (var i = 0; i < obj.length; i++) {
                        var id = page + '' + i;
                        MyMap.Models.searchData.isSaved(id, obj[i]);
                    }
                });
            },
            // Count Page SearchAll
            countSearchAll: function (key) {
                try {
                    MyMapProject.Library.Ajax.Map.CountSearch(key, function (e) {

                        var num = e.value;
                        if (num <= 0) {
                            MyMap.Views.viewError('Không tìm thấy bất cứ thông tin nào về từ khóa. Vui lòng tìm từ khóa khác');
                        } else {

                            var num_page = 0;
                            if ((num % 10) > 0) {
                                num_page = Math.floor(num / 10) + 1;
                            } else {
                                num_page = Math.floor(num / 10);
                            }
                            MyMap.Views.searchData.addPagination(num_page, key);
                        }

                    });
                } catch (e) {
                    console.log("false");
                }
            },
            //Remove Div Item Search
            removeItem: function (id) {
                MyMap.Views.searchData.removeItem(id);
                MyMap.Views.searchData.removeMarker(id);
            },
            //Save Point
            saveData: function (id, obj) {
                var name = obj.Name;
                var address = obj.Number + ', ' + obj.Street + ', ' + obj.Ward + ', ' +
                    obj.District + ', ' + obj.Province;
                // Vòng lặp xử lí chuổi
                while (address.slice(0, 2) == ', ') {
                    address = address.substring(2);
                }
                var long = obj.Longitude;
                var lat = obj.Latitude;
                var inform = "";
                MyMapProject.Library.Ajax.Map.Create(name, lat, long, inform, address, function (e) {
                    MyMap.Models.searchData.isSaveSuccess(e.value, id)
                });
            },
            //Function display and set id for forget button if insert success
            isSaveSuccess: function (Id_db, Id_item) {
                if (Id_db != null) {
                    var item = document.getElementById(Id_item);
                    var forget = item.children[1].children[2];
                    forget.id = Id_db;
                    MyMap.Views.searchData.idSave.push(Id_item);
                    MyMap.Views.searchData.idMongo.push(Id_db);
                    MyMap.Views.searchData.saveSuccess(Id_item);
                }
            },
            //Function remove item in Database
            forgetData: function (id, btn_forget) {
                var Id_db = btn_forget.id;
                MyMapProject.Library.Ajax.Map.Remove(Id_db, function (e) {
                    MyMap.Models.searchData.isForgetSuccess(e.value, id)
                });
            },
            //Function display and set id for save button if remove success
            isForgetSuccess: function (bool, id) {
                if (bool) {
                    for (var i = 0; i < MyMap.Views.searchData.idSave.length; i++) {
                        if (MyMap.Views.searchData.idSave[i] == id) {
                            MyMap.Views.searchData.idSave.splice(i, 1);
                            MyMap.Views.searchData.idMongo.splice(i, 1);
                        }
                    }
                    MyMap.Views.searchData.forgetSuccess(id);
                }
            },
            // Function check Point in database
            isSaved: function (id, obj) {
                MyMapProject.Library.Ajax.Map.GetId(obj.Name, obj.Latitude, obj.Longitude, function (e) {
                    if (e.value[0]) {
                        MyMap.Views.searchData.addItem(id, obj, e.value[0]._id);
                    }
                    else {
                        MyMap.Views.searchData.addItem(id, obj, '');
                    }
                })
            },
            //view Marker
            viewMarker: function (idMarker, obj) {
                var long = obj.Longitude;
                var lat = obj.Latitude;
                MyMap.Views.searchData.addMarker(idMarker, long, lat);
            },
            //remove marker
            removeMarker: function (idMarker) {
                MyMap.Views.searchData.removeMarker(idMarker);
            }
        },


        LoadMarker: function (hideMarke1, hideMarker2, showMarker) {
            for (var i = 0; i < hideMarke1.length; i++) {
                MyMap.map.removeMarker(hideMarke1[i]);
            }

            for (var i = 0; i < hideMarker2.length; i++) {
                MyMap.map.removeMarker(hideMarker2[i]);
            }
            if (showMarker.length) {
                for (var i = 0; i < showMarker.length; i++) {
                    MyMap.map.addMarker(showMarker[i]);
                }
            }

        },
        //FindPath
        findPath: {
            Points: [],
            Find: [],
            Marker: [],
            Line: [],
            Path: [],
            dirMarKer: [],
            inDir: [],
            inStart: [],
            inDistance: [],
            inName: [],
            //Search All
            searchAll: function (key, page, num_point) {
                MyMapProject.Library.Ajax.Map.Search(key, page, function (e) {
                    var obj = e.value;
                    for (var i = 0; i < obj.length; i++) {
                        var id = page + '' + i;
                        MyMap.Views.findPath.addItem(id, obj[i], num_point);
                    }
                });
            },
            //Count Page Search ALL
            countSearchData: function (key, num_point) {
                MyMapProject.Library.Ajax.Map.CountSearch(key, function (e) {
                    var num = e.value;
                    if (num <= 0) {
                        MyMap.Views.viewError('Không tìm thấy bất cứ thông tin nào về từ khóa. Vui lòng tìm từ khóa khác');
                    } else {
                        var num_page = 0;
                        if ((num % 10) > 0) {
                            num_page = Math.floor(num / 10) + 1;
                        } else {
                            num_page = Math.floor(num / 10);
                        }
                        MyMap.Views.findPath.addPagination(num_page, key, num_point);
                    }
                });
            },
            //Select Point to FindPath
            selectItem: function (obj, num_point) {
                var name = obj.Name;
                var long = obj.Longitude;
                var lat = obj.Latitude;
                var string = name + " ( " + long + ", " + lat + " )";
                var point = new vbd.LatLng(lat, long);

                point.id = num_point;
                point.name = name;
                //MyMap.Models.findPath.Points[num_point] = point;
                MyMap.Models.findPath.Find[num_point] = [];
                MyMap.Models.findPath.Find[num_point].push(point);
                MyMap.Views.findPath.selectItem(num_point, string, point);
                MyMap.Views.findPath.viewMarker(num_point, point);
            },
            //FindSortPath
            findSortPath: function () {
                var Find = MyMap.Models.findPath.Find;
                var len = Find.length;
                if (len >= 2) {
                    if (Find[0] != null) {
                        var p1 = Find[0][0];
                        var p2 = Find[len - 1][0];
                        var newArray = [];
                        for (var i = 0; i < len; i++) {
                            for (var j = 0; j < Find[i].length; j++) {
                                newArray.push(Find[i][j]);
                            }
                        }
                        var type;
                        if (document.getElementById('driving').checked) {
                            type = 2
                        } else if (document.getElementById('cycling').checked){
                            type= 1
                        } else {
                            type = 0
                        }
                        MyMapProject.Library.Ajax.Map.ShortPath(newArray, type, function (e) {
                            if (e.value == null) {
                                MyMap.Views.viewError('Hai vị trí cách nhau quá xa. Không thể tìm thấy dữ liệu. Vui lòng tìm kiếm vị trí gần hơn')
                                document.getElementById('saveFindStreet').style.display = 'none';
                                document.getElementById('transporttype').style.display = 'none';
                            } else {
                                MyMap.Models.findPath.returnPath(e.value);
                                MyMap.Models.findPath.Find = [];
                                for (var i = 0; i < newArray.length; i++) {
                                    MyMap.Models.findPath.Find[i] = [];
                                    MyMap.Models.findPath.Find[i][0] = newArray[i];
                                }
                            }
                        });
                    }
                }
                else {
                    console.log('false');
                }
            },
            //Process result's  function FindSortPath
            returnPath: function (obj) {
                MyMap.Models.findPath.resetAll();
                //Path Line
                if (obj.FullPath != null) {
                    for (var k = 0; k < obj.FullPath[0].length; k++) {
                        MyMap.Models.findPath.Path[k] = [];
                        MyMap.Models.findPath.inDir[k] = [];
                        MyMap.Models.findPath.inDistance[k] = [];
                        MyMap.Models.findPath.inName[k] = [];
                        MyMap.Models.findPath.inStart[k] = [];

                        for (var i = 0; i < obj.FullPath[0][k].length; i = i + 2) {
                            var long = obj.FullPath[0][k][i];
                            var lat = obj.FullPath[0][k][i + 1];
                            var point = new vbd.LatLng(lat, long);
                            MyMap.Models.findPath.Path[k].push(point);
                        }

                        //Dirs Guide
                        for (var i = 0; i < obj.ResultScript.Leg[k].Step.length; i++) {
                            var num = obj.ResultScript.Leg[k].Step[i].dir;
                            var string;
                            if (num == '0') {
                                string = 'Đi thẳng ';
                            } else if (num == '1') {
                                string = 'Rẻ trái ';
                            } else if (num == '2') {
                                string = 'Rẻ phải ';
                            } else if (num == '3') {
                                string = 'Đi tiếp ';
                            } else if (num == '4') {
                                string = 'Qua'
                            } else if (num == '5') {
                                string = 'Rẻ vào'
                            } else if (num == '6') {
                                string = 'Đến'
                            } else {
                                string = 'Hướng'
                            }
                            MyMap.Models.findPath.inDir[k].push(string);
                            MyMap.Models.findPath.inDistance[k].push(obj.ResultScript.Leg[k].Step[i].len);
                            MyMap.Models.findPath.inName[k].push(obj.ResultScript.Leg[k].Step[i].name);
                            MyMap.Models.findPath.inStart[k].push(obj.ResultScript.Leg[k].Step[i].start);
                        };
                        //Draw Line
                        MyMap.Views.findPath.removeLine(k);
                        MyMap.Views.findPath.drawLine(k, MyMap.Models.findPath.Path[k]);
                        //Insert Guide
                        for (var i = 0; i < MyMap.Models.findPath.inDir[k].length; i++) {
                            var dir = MyMap.Models.findPath.inDir[k][i];
                            var name = MyMap.Models.findPath.inName[k][i];
                            var len = MyMap.Models.findPath.inDistance[k][i];
                            var start = MyMap.Models.findPath.inStart[k][i];
                            MyMap.Views.findPath.insertGuide(dir, name, len, start, MyMap.Models.findPath.Path[k]);

                        }

                    };
                    MyMap.Views.findPath.saveStreet();
                }


            },
            //Reset Array
            resetAll: function () {
                MyMap.Models.findPath.inDistance = [];
                MyMap.Models.findPath.inName = [];
                MyMap.Models.findPath.inDir = [];
                MyMap.Models.findPath.Path = [];
                MyMap.Models.findPath.inStart = [];
                var list = document.getElementById('list-guideStreet');
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
            },
            //whatHere
            whatHere: function (num_point, position, bool) {
                MyMapProject.Library.Ajax.Map.WhatHere(position.Longitude, position.Latitude, function (e) {
                    var obj = e.value;
                    if (obj.District == null) {
                        MyMap.Views.viewError('Cảnh báo! Vị trí nằm ngoài lãnh thổ Việt Nam');
                    } else {
                        var string = obj.Ward + ',' + obj.Province + ',' + obj.District
                            + '(' + obj.Longitude + ',' + obj.Latitude + ')';
                        var point = new vbd.LatLng(obj.Latitude, obj.Longitude);
                        point.name = obj.Ward + ',' + obj.Province + ',' + obj.District;
                        //MyMap.Models.findPath.Points[num_point] = point;
                        var Find = MyMap.Models.findPath.Find;
                        if (bool) {
                            Find[num_point] = [];
                            Find[num_point].push(point);
                            console.log(Find);
                        } else {
                            if (num_point == 0) {
                                Find[0][0] = point;
                            } else {
                                Find[Find.length - 1][0] = point;
                            }
                        }
                        MyMap.Views.findPath.selectItem(num_point, string, point);
                    }
                })
            },
            //drawLine
            drawLine: function (num_point, position, num_line) {
                var Find = [];
                for (var i = 0; i < MyMap.Models.findPath.Find.length; i++) {
                    for (var j = 0; j < MyMap.Models.findPath.Find[i].length; j++) {
                        Find[i] = [];
                        Find[i][j] = MyMap.Models.findPath.Find[i][j];
                    }
                }
                var len = Find.length;
                if (num_point == 0) {
                    Find[0][0] = position;
                } else if (num_point == 1) {
                    Find[Find.length - 1][0] = position;
                } else if (num_point == 2) {
                    Find[num_line].push(position);
                } else {
                    // num_line là idmarker (num_point = 3)
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < Find[i].length; j++) {
                            if (Find[i][j].id == num_line) {
                                Find[i][j] = position;
                            }
                        }
                    }
                }
                var p1 = Find[0][0];
                var p2 = Find[Find.length - 1][0];

                if (len >= 2 && p1 != '' && p2 != '' && p1 != p2) {
                    var newArray = [];
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < Find[i].length; j++) {
                            newArray.push(Find[i][j]);
                        }
                    }
                    MyMapProject.Library.Ajax.Map.ShortPath(newArray, 1, function (e) {
                        var obj = e.value;
                        if (obj != null) {
                            MyMap.Models.findPath.resetAll();

                            MyMap.Views.findPath.removeAllLine();
                            for (var k = 0; k < obj.FullPath[0].length; k++) {
                                MyMap.Models.findPath.Path[k] = [];
                                for (var i = 0; i < obj.FullPath[0][k].length; i = i + 2) {
                                    var long = obj.FullPath[0][k][i];
                                    var lat = obj.FullPath[0][k][i + 1];
                                    var point = new vbd.LatLng(lat, long);
                                    MyMap.Models.findPath.Path[k].push(point);
                                }
                                MyMap.Views.findPath.removeLine(k);
                                MyMap.Views.findPath.drawLine(k, MyMap.Models.findPath.Path[k]);
                            }



                        }
                    });
                }

            },
            //Save Street into database
            saveStreet: function (namepath) {
                var Find = MyMap.Models.findPath.Find;
                if (Find.length >= 2) {
                    var path = [];
                    for (var i = 0; i < Find.length; i++) {
                        for (var j = 0; j < Find[i].length; j++) {
                            var pt = Find[i][j];
                            path.push(pt.name);
                            path.push(pt.Latitude.toString());
                            path.push(pt.Longitude.toString());

                        }

                    }

                    MyMapProject.Library.Ajax.Map.CreatePath(namepath, path, function (e) {
                        if (e.value != null) {
                            var removeStreet = document.getElementsByClassName('removeStreet');
                            for (var i = 0; i < removeStreet.length; i++) {
                                removeStreet[i].id = e.value;
                                removeStreet[i].innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
                            }
                            removeStreet.id = e.value;
                            var nameStreet = document.getElementById('nameStreet');
                            nameStreet.innerHTML = namepath;
                        } else {
                            var removeStreet = document.getElementsByClassName('removeStreet');
                            for (var i = 0; i < removeStreet.length; i++) {
                                removeStreet[i].id = '';
                                removeStreet[i].innerHTML = '<i class="glyphicon glyphicon-refresh"></i>';
                            }

                            var nameStreet = document.getElementById('nameStreet');
                            nameStreet.innerHTML = "Thất bại";

                        }

                    })
                }
            },
            //remove in database
            removeStreet: function (id) {
                MyMapProject.Library.Ajax.Map.RemovePath(id, function (e) {
                    console.log(e);
                })
            }
        },

        //Fillter On Tap
        Fillter: {
            filltTabIlistPoint: function (textFillT) {
                textFillT = textFillT.toUpperCase();
                if (textFillT) {
                    $('#addRowPoint .list-group-item ').each(function () {
                        var namePoint = $(this).children().eq(0).text();
                        if (namePoint.toUpperCase().indexOf(textFillT) > -1)
                            $(this).css('display', '')
                        else
                            $(this).css('display', 'none')
                    });
                }
                else {
                    $('#addRowPoint .list-group-item ').css('display', '');
                }
            },
            filltTabIlistStreet: function (textFillT) {
                textFillT = textFillT.toUpperCase();
                if (textFillT) {
                    $('#addRowLine .list-group-item ').each(function () {
                        var namePoint = $(this).children().eq(0).text();
                        if (namePoint.toUpperCase().indexOf(textFillT) > -1)
                            $(this).css('display', '')
                        else
                            $(this).css('display', 'none')

                    });
                }
                else {

                    $('#addRowPoint .list-group-item ').css('display', '');
                }

            },

            filltTapSearch: function (textFillT) {
                textFillT = textFillT.toUpperCase();
                if (textFillT) {
                    $('#list-search .list-group-item').each(function () {
                        var namePoint = $(this).children().eq(0).children().eq(0).text();
                        if (namePoint.toUpperCase().indexOf(textFillT) > -1)
                            $(this).css('display', '')
                        else
                            $(this).css('display', 'none')

                    });
                }
                else {
                    $('#list-search  .list-group-item ').css('display', '');
                }

            }

        },

        //AutoSuggess Search
        AutoSuggessSearch: function (key) {
            data = MyMapProject.Library.Ajax.Map.AutoSuggestSearch(key);
            if (data && data.value && data.value.length) {
                data = data.value;
                $("#content .searchPoint").autocomplete({
                    lookup: data,
                    content: data
                })
            }
        },

    },

    //-----------End Models---------

    //-----------Controller-----------
    Controller: {

        //CONTROLLER GET DATA
        getData: {
            //Get All Point from database
            getAllPoint: function () {
                MyMap.Models.getData.getAllPoint();
            },
            //Get Info User
            getUser: function () {
                MyMap.Models.getData.getUser();
            },
            //Get All Line from database
            getAllLine: function () {
                MyMap.Models.getData.getAllLine();
            },
            //Draw line 
            drawLine: function (obj) {
                MyMap.Models.getData.drawLine(obj);
            }
        },

        //CONTROLLER UPDATE DATA
        updateData: {


            updatePoint: function (obj) {
                MyMap.Models.updateData.updatePoint(obj);
            },


            updateLine: function (obj) {
                MyMap.Models.updateData.updateLine(obj);
            },

            updatePointLine: function () {
                MyMap.Models.updateData.updatePointLine();
            },

            whatHere: function (num_point, position) {
                MyMap.Models.updateData.whatHere(num_point, position);
            },

            findSortPath: function (Path) {
                MyMap.Models.updateData.findSortPath(Path);
            }

        },

        //Delete database
        deleteData: {
            deletePoint: function (obj) {
                MyMap.Models.deleteData.deletePoint(obj);
            },
            deleteLine: function (obj) {
                MyMap.Models.deleteData.deleteLine(obj);
            }

        },

        //Find point when click on Map
        ClickOnMap: {
            ClickMarker: function (marker, obj) {
                MyMap.Models.ClickOnMap.ClickMarker(marker, obj);
            },
        },

        //Find marker when click point on Tap
        ClickOnTap:
        {
            ClickPointTapSearch: function (obj) {
                MyMap.Models.ClickOnTap.ClickPointTapSearch(obj)
            },

            ClickPointModal: function () {
                MyMap.Models.ClickOnTap.ClickPointModal('FromSearch');
                MyMap.Models.ClickOnTap.ClickPointModal('ToSearch');
            },

            ClcikScreenShot: function () {
                MyMap.Models.ClickOnTap.ClickScreenShot();
            },

            ClickIconToggleMarker: function (obj) {
                MyMap.Models.ClickOnTap.ToggleMarker(obj);
            },
            //Refresh each tap
            Refresh: {
                refTapIlist: function () {
                    $('#tab-Ilist-find .glyphicon-refresh').click(function () {
                        MyMap.Models.ClickOnTap.Refresh.refTapIlistLine();
                    });
                    $('#tab-Ilist-search .glyphicon-refresh').click(function () {
                        var markerIlist = MyMap.Models.markerTap.markerIlist;
                        MyMap.Models.ClickOnTap.Refresh.refTapIlist(markerIlist);
                        markerIlist = [];
                        MyMap.Models.markerTap.markerIlist = markerIlist;
                    });
                },
                refTapStreet: function () {
                    $('#tab-findStreet .glyphicon-refresh').click(function () {
                        var markerStreet = MyMap.Models.markerTap.markerStreet;
                        //for (var i = 0; i < MyMap.Models.findPath.Marker.length; i++) {
                        //    markerStreet.push(MyMap.Models.findPath.Marker[i])
                        //}
                        //for (var i = 0; i < MyMap.Models.findPath.dirMarKer.length; i++) {
                        //    markerStreet.push(MyMap.Models.findPath.dirMarKer[i]);
                        //}
                        MyMap.Models.ClickOnTap.Refresh.refTapStreet(markerStreet);
                        markerStreet = [];
                        MyMap.Models.findPath.Marker = [];
                        MyMap.Models.findPath.dirMarKer = [];
                        MyMap.Models.findPath.Find = [];
                        $('#saveFindStreet').hide();
                        $('#transporttype').hide();
                    });
                },

                refTapSearch: function () {
                    $('#tab-search .glyphicon-refresh').click(function () {
                        var markerSearch = MyMap.Models.markerTap.markerSearch;
                        MyMap.Models.ClickOnTap.Refresh.refTapSearch(markerSearch);

                        markerSearch = [];
                        MyMap.Models.markerTap.markerSearch = markerSearch;
                        $('#pagination').hide();
                    });

                }

            }

        },

        // CONTROLLER SEARCH
        searchData: {
            //Count Page Search All
            countSearchAll: function (key) {
                MyMap.Models.searchData.countSearchAll(key);
            },
            //Search All
            searchAll: function (key, page) {
                MyMap.Models.searchData.searchAll(key, page);
            },
            //Save Point Database
            saveData: function (id, obj) {
                MyMap.Models.searchData.saveData(id, obj);
            },
            //Delete Point Database
            forgetData: function (id, btn_forget) {
                MyMap.Models.searchData.forgetData(id, btn_forget)
            },
            //Check Point Database
            isSaved: function (id, obj) {
                MyMap.Models.searchData.isSaved(id, obj);
            },
            //View Marker 
            viewMarker: function (bool, id, obj) {
                if (!bool) {
                    MyMap.Models.searchData.viewMarker(id, obj);
                }
                else {
                    MyMap.Models.searchData.removeMarker(id);
                }
            },
            //Remove Div
            removeItem: function (id) {
                MyMap.Models.searchData.removeItem(id);
            },
            //Remove All Marker and Div Item
            removeAll: function () {
                MyMap.Views.searchData.removeAllItem();
                MyMap.Views.searchData.removeAllMarker();
            }

        },

        // Load Marker
        loadMarkerTap: function () {
            $('#content  .elTab').each(function () {
                $(this).click(function myfunction() {
                    MyMap.Models.markerTap.markerSearch = MyMap.Views.searchData.Marker;
                    MyMap.Models.markerTap.markerStreet = MyMap.Models.findPath.Marker;
                    var markerIlist = MyMap.Models.markerTap.markerIlist;
                    var markerSearch = MyMap.Models.markerTap.markerSearch;
                    var markerStreet = MyMap.Models.markerTap.markerStreet;

                    MyMap.Models.ClickOnTap.Refresh.refTapIlistLine();

                    if ($(this).text() == 'Tìm đường') {
                        MyMap.Models.LoadMarker(markerIlist, markerSearch, markerStreet);
                        if (MyMap.infowindow) {
                            MyMap.infowindow.close();
                            MyMap.infowindow = null;
                        }
                        for (var i = 0; i < MyMap.Models.findPath.Line.length; i++) {
                            MyMap.Models.findPath.Line[i].setMap(MyMap.map);
                        }
                        for (var i = 0; i < MyMap.Views.findPath.dirMarKer.length; i++) {
                            MyMap.Views.findPath.dirMarKer[i].setMap(MyMap.map)
                        }
                    }

                    if ($(this).text() == 'Tìm điểm') {
                        MyMap.Models.LoadMarker(markerIlist, markerStreet, markerSearch);
                        if (MyMap.infowindow) {
                            MyMap.infowindow.close();
                            MyMap.infowindow = null;
                        }
                        for (var i = 0; i < MyMap.Models.findPath.Line.length; i++) {
                            MyMap.Models.findPath.Line[i].setMap();
                        }
                        for (var i = 0; i < MyMap.Views.findPath.dirMarKer.length; i++) {
                            MyMap.Views.findPath.dirMarKer[i].setMap()
                        }
                    }

                    if ($(this).text() == 'Cá nhân') {
                        MyMap.Models.LoadMarker(markerSearch, markerStreet, markerIlist);
                        for (var i = 0; i < markerIlist.length; i++) {
                            $('#addRowPoint .list-group-item').each(function () {
                                var id = $(this).attr('id');
                                if (markerIlist[i].id == id) {
                                    //$(this).children().eq(0).click();
                                    $(this).children().eq(2).children().eq(0).css('color', '#cf2e1e');
                                }
                            })
                        }                     
                        for (var i = 0; i < MyMap.Models.findPath.Line.length; i++) {
                            MyMap.Models.findPath.Line[i].setMap();
                        }
                        for (var i = 0; i < MyMap.Views.findPath.dirMarKer.length; i++) {
                            MyMap.Views.findPath.dirMarKer[i].setMap()
                        }
                    }
                })

            });



        },

        //FINDPATH
        findPath: {
            //Count Page Search All
            countSearchData: function (key, num_point) {
                MyMap.Models.findPath.countSearchData(key, num_point);
            },
            //Search All
            searchAll: function (key, page, num_point) {
                MyMap.Models.findPath.searchAll(key, page, num_point);
            },
            //Select Point to FindPath
            selectItem: function (obj, num_point) {
                MyMap.Models.findPath.selectItem(obj, num_point);
            },
            //Find Sort Path
            findSortPath: function () {
                MyMap.Models.findPath.findSortPath();
            },
            //What Here
            whatHere: function (num_point, position) {
                MyMap.Models.findPath.whatHere(num_point, position);
            },
            //Draw Line after FindSortPath
            drawLine: function (num_point, position, num_line) {
                MyMap.Models.findPath.drawLine(num_point, position, num_line);
            },
            //Save Street Database
            saveStreet: function (namepath) {
                MyMap.Models.findPath.saveStreet(namepath);
            },
            //Delete Street database
            removeStreet: function (id) {
                MyMap.Models.findPath.removeStreet(id);
            }

        },

        //Fillter On Tap
        Fillter: {
            //Filter Ilist
            filltTabIlistPoint: function () {
                $('#list-Ilist-search .input-group input').keyup(function () {
                    var textFillT = $(this).val();
                    MyMap.Models.Fillter.filltTabIlistPoint(textFillT);
                })
            },
            //Filter FindStreet
            filltTabIlistStreet: function () {
                $('#list-Ilist-find .input-group input').keyup(function () {
                    var textFillT = $(this).val();
                    MyMap.Models.Fillter.filltTabIlistStreet(textFillT);
                })
            },
            //Filter Search
            filltTapSearch:
            {
                ClikBtnFillter: function () {
                    $('#tab-search .input-group .btn').click(function () {
                        var textFillT = $('#tab-search .input-group input').val();
                        MyMap.Models.Fillter.filltTapSearch(textFillT);
                    })
                },
                keyupFillter: function () {
                    $('#tab-search .input-group input').keyup(function () {

                        $('#tab-search .input-group .btn').click();
                    });
                },

            },


        },

        //AutoSuggess
        AutoSuggess: function () {
            $('.searchPoint').keypress(function () {
                key = $(this).val()
                var div = this;
                if (key.length > 2) {
                    MyMapProject.Library.Ajax.Map.AutoSuggestSearch(key, function (data) {
                        if (data && data.value && data.value.length) {
                            data = data.value;
                            $(div).autocomplete({
                                lookup: data,
                                content: data
                            })
                        }
                    })
                }

            })
        },

    },
    //-----------End Controller---------

    //------------InitMap------------
    init: {
        //LoadMap
        loadMap: function () {
            var map = MyMap.Views.createMap('map');
            MyMap.map = map;            
        },

        //LoadDisplay
        loadDisplay: function () {

            //Change Tab with button
            $('#btn-toggle-search').click(function () {
                $('#tab-search').show();
                $('#tab-findStreet').hide();
                $('#tab-Ilist').hide();
            });

            $('#btn-toggle-find').click(function () {
                $('#tab-search').hide();
                $('#tab-findStreet').show();
                $('#tab-Ilist').hide();
            });
            $('#btn-toggle-ilist').click(function () {
                $('#tab-search').hide();
                $('#tab-findStreet').hide();
                $('#tab-Ilist').show();
                $('#tab-Ilist-search').click();
            });
            //Toggle tabs
            var toggleClick = true;
            $('.toggle-tabs').click(function () {
                if (toggleClick) {
                    $('#tabs').hide('fast');
                    $('#content').removeAttr('class');
                    $('#content').addClass('col-xs-12');

                    toggleClick = false;

                } else {
                    $('#tabs').show('normal');
                    toggleClick = true;
                    $('#content').removeAttr('class');
                    $('#content').addClass('col-md-9');
                    $('#content').addClass('col-xs-8');
                }

            });
            //Hide show points, line in Ilist
            $('#tab-Ilist-find').click(function () {
                $('#list-Ilist-search').hide();
                $('#list-Ilist-find').show();
                $('#tab-Ilist-search').removeClass('tab-active');
                $('#tab-Ilist-find').removeClass('tab-off');
                $('#tab-Ilist-search').addClass('tab-off');
                $('#tab-Ilist-find').addClass('tab-active');
                MyMap.Models.ClickOnTap.Refresh.refTapIlist(MyMap.Models.markerTap.markerIlist);
            });


            $('#tab-Ilist-search').click(function () {
                $('#list-Ilist-search').show();
                $('#list-Ilist-find').hide();
                $('#tab-Ilist-search').removeClass('tab-off');
                $('#tab-Ilist-find').removeClass('tab-active');
                $('#tab-Ilist-search').addClass('tab-active');
                $('#tab-Ilist-find').addClass('tab-off');
                MyMap.Models.ClickOnTap.Refresh.refTapIlistLine();
            });

            //Resize window
            resize();
            function resize() {
                var height = $(window).height();
                var width = $(window).width();
                $('#body').css("height", height - 50 + 'px');
                $('#view-searchFind').css("height", height - 100 + 'px');
                $('#map').css("height", height - 100 + 'px');
                $('#list-search').css("height", height - 220 + 'px');
                $('#list-view-searchFind').css("height", height - 200 + 'px');
                $('#groupFindStreet').css("height", height - 210 + 'px');
                $('#list-guideStreet').css("height", height - 290 + 'px');
                if (width >= 745) {
                    $('#list-Ilist .list-group').css("height", height - 175 + 'px');
                }
                else {
                    $('#list-Ilist .list-group').css("height", height - 225 + 'px');
                }

                if (width < 500) {
                    $('#head-findStreet').html('<div><i class="glyphicon glyphicon-refresh" ></i></div ><i class="glyphicon glyphicon-flag" ></i>');
                    $('#head-search').html('<div><i class="glyphicon glyphicon-refresh" ></i></div > <i class="glyphicon glyphicon-search" ></i>');
                    $('#btn-toggle-search').html('<i class="glyphicon glyphicon-search" ></i> ');
                    $('#btn-toggle-find').html('<i class="glyphicon glyphicon-flag" ></i> ');
                    $('#btn-toggle-ilist').html('<i class="glyphicon glyphicon-fire" ></i> ');
                }
                else {
                    $('#head-findStreet').html('<div><i class="glyphicon glyphicon-refresh" ></i></div >Tìm đường đi ngắn nhất')
                    $('#head-search').html('<div><i class="glyphicon glyphicon-refresh" ></i></div >Tìm kiếm địa điểm');
                    $('#btn-toggle-search').html('Tìm điểm');
                    $('#btn-toggle-find').html('Tìm đường');
                    $('#btn-toggle-ilist').html('Cá nhân');
                }

            }

            $(window).resize(function () {
                resize();

            });


            //Event with Hide Modal
            $('#modal-editPoint').on('hidden.bs.modal', function () {
                $("#success-point").css('display', 'none');
                $("#form-edit-point").css('display', 'block');
            });
            $('#modal-editLine').on('hidden.bs.modal', function () {
                $("#success-line").css('display', 'none');
                $("#form-edit-line").css('display', 'block');
            });

            //Display view-searchFind
            $('#head-view-searchFind button').click(function () {
                $('#view-searchFind').hide('fast');
            })            


        },
        //event User
        eventUser: function () {
            //Button save find Street
            $("#namepath").focus(function () {
                $("#cuboid").addClass("ready");
            })
            //remove '.ready' when user blus away but only if there is no content
            $("#namepath").blur(function () {
                if ($(this).val() == "")
                    $("#cuboid").removeClass("ready");
            })

            $("#namepath").keypress(function (e) {
                if (e.keyCode === 13) {
                    if ($(this).val() !== "") {
                        $("#save").click();
                    }
                    return false;
                }

            })
            //If the user is typing something make the arrow green/.active
            $("#namepath").keyup(function () {
                //this adds .active class only if the input has some text
                $(".submit-icon").toggleClass("active", $(this).val().length > 0);
            })

            //on form submit remove .ready and add .loading to the form
            $("#save").click(function () {
                $("#cuboid").removeClass("ready").addClass("loading");
                //finish loading in 3s
                var namepath = $("#namepath").val();
                MyMap.Controller.findPath.saveStreet(namepath);
                setTimeout(complete, 2000);

                //prevent default form submisson
                return false;
            })
            function complete() {
                $("#cuboid").removeClass("loading").addClass("complete");
            }
            //reset/refresh functionality
            $(".removeStreet").click(function () {
                if (this.id == '') {
                    $("#cuboid").removeClass("complete");
                    $("#namepath").val('');
                    $(".submit-icon").removeClass("active");
                } else {
                    MyMap.Controller.findPath.removeStreet(this.id);
                    $("#cuboid").removeClass("complete");
                    $("#namepath").val('');
                    $(".submit-icon").removeClass("active");
                }
            })
            
            // Event Onkeypress and click button
            var searchAll = document.getElementById("btn-search-all");
            searchAll.onclick = handleButtonSearch;
            var inputSearchAll = document.getElementById("input-search-all");
            inputSearchAll.onkeypress = handleKeySearch;
            
            var fromSearch = document.getElementById("btn-fromsearch");
            fromSearch.onclick = handleButtonFromSearch;
            var inputFromSearch = document.getElementById("input-fromsearch");
            inputFromSearch.onkeypress = handleKeyFromSearch;
            
            var toSearch = document.getElementById("btn-tosearch");
            toSearch.onclick = handleButtonToSearch;
            var inputToSearch = document.getElementById("input-tosearch");
            inputToSearch.onkeypress = handleKeyToSearch;

            // Envent get Data's Users
            MyMap.Controller.getData.getAllPoint();
            MyMap.Controller.getData.getAllLine();
            MyMap.Controller.getData.getUser();
            document.getElementById('btn-toggle-ilist').onclick = function () {
                var list = document.getElementById('addRowPoint');
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                var listLine = document.getElementById('addRowLine');
                while (listLine.firstChild) {
                    listLine.removeChild(listLine.firstChild);
                }
                MyMap.Controller.getData.getAllPoint();
                MyMap.Controller.getData.getAllLine();
            }


            //Event change transporttype
            $('#radios input').click(function () {
                MyMap.Controller.findPath.findSortPath();
            });


            //Event click out modalerror
            $(document).mouseup(function (e) {
                var container = $("#modalerror");              
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide('normal');
                }
            });
            $('#close_error').click(function () {
                $("#modalerror").hide('normal')
            });

           
            //Click Screen Shot
            MyMap.Controller.ClickOnTap.ClcikScreenShot();

            //Load Marker
            MyMap.Controller.loadMarkerTap();

            //----------- Refresh Tap 

            //Refresh tap Ilist
            MyMap.Controller.ClickOnTap.Refresh.refTapIlist();

            //Refresh tap findStreet
            MyMap.Controller.ClickOnTap.Refresh.refTapStreet();

            //Refresh tap Search
            MyMap.Controller.ClickOnTap.Refresh.refTapSearch();

            //Fillter tap Ilist Point
            MyMap.Controller.Fillter.filltTabIlistPoint();

            //Fillter tap Ilist Street
            MyMap.Controller.Fillter.filltTabIlistStreet();

            // Fillter tap search
            MyMap.Controller.Fillter.filltTapSearch.keyupFillter();
            MyMap.Controller.Fillter.filltTapSearch.ClikBtnFillter();

            //AutoSuggess tap Search
            MyMap.Controller.AutoSuggess();
        }

    }
    //------------End InitMap------------

}


function handleButtonSearch() {
    var guessInput = document.getElementById("input-search-all");
    MyMap.Controller.searchData.countSearchAll(guessInput.value);
    MyMap.Controller.searchData.removeAll();
    document.getElementById('btn-toggle-search').click();
    guessInput.value = "";
    guessInput.focus();

}


function handleKeySearch(e) {
    var searchButton = document.getElementById("btn-search-all");
    if (e.keyCode === 13) {
        searchButton.click();
        return false;
    }
}

function handleButtonToSearch() {
    var guessInput = document.getElementById("input-tosearch");


    MyMap.Controller.findPath.countSearchData(guessInput.value, 1);
    guessInput.value = "";
    guessInput.focus();
}

function handleKeyToSearch(e) {
    var searchButton = document.getElementById("btn-tosearch");
    if (e.keyCode === 13) {
        searchButton.click();
        return false;
    }
}

function handleButtonFromSearch() {
    var guessInput = document.getElementById("input-fromsearch");


    MyMap.Controller.findPath.countSearchData(guessInput.value, 0);
    guessInput.value = "";
    guessInput.focus();
}

function handleKeyFromSearch(e) {
    var searchButton = document.getElementById("btn-fromsearch");
    if (e.keyCode === 13) {
        searchButton.click();
        return false;
    }
}