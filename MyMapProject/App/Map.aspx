<%@ Page Title="" Language="C#" MasterPageFile="~/App/Default.Master" AutoEventWireup="true" CodeBehind="Map.aspx.cs" Inherits="MyMapProject.App.Map" %>

<asp:Content ID="Content1" ContentPlaceHolderID="header" runat="server">

    <%= Combres.WebExtensions.CombresLink("App_Map_Style")%>
    <%= Combres.WebExtensions.CombresLink("App_Map_ScriptHeader")%>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="http://developers.vietbando.com/V2/Scripts/vietbandomapsapi.js?key=c3d55e9b-24d0-4342-80b6-0a5391afe776" type="text/javascript"></script>
    <link href="Content/styles.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scritps/map.js"></script>
    <script src="../Scripts/jquery-3.2.1.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/jquery.autocomplete.min.js"></script>
    <link href="../Content/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="Content/map.css" rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="container-fluid">

        <div id="header">
            <div id="nav">
                <div class="navbar navbar-fixed-top" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-menu" id="btn-collapse-nav">
                                <span class="sr-only">Toggle navigation</span>
                                <span class=" glyphicon glyphicon-cog"></span>

                            </button>
                            <a class="navbar-brand" href="/">
                                <strong class="first-primary">MY </strong><strong>MAP</strong>
                            </a>
                        </div>
                        <div class="navbar-collapse collapse" id="collapse-menu">

                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="../Manage" id="profile">kjakfjk</a></li>
                                <li><a href="logoff.aspx">
                                    <i class="glyphicon glyphicon-off"></i>
                                    Đăng xuất 
                       
                                </a></li>

                            </ul>

                            <%-- <ul class="nav navbar-nav navbar-right">
                                <li><a href="../Manage" id="profile">kjakfjk</a></li>
                                <li><a href="../">
                                    <i class="glyphicon glyphicon-off"></i>
                                    Đăng xuất 
                       
                                </a></li>

                            </ul>--%>
                        </div>
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </div>
            <div id="userInfo">
                <div class="card">
                    <div class="border-card">
                        <div id="card-info">
                            <h4>TO LO</h4>
                            <p class="title">CEO & Founder, Example</p>
                            <p class="title">CEO & Founder, Example</p>
                            <button id="btn-changeinfo" type="button">Chỉnh sửa</button>
                        </div>

                        <div id="card-update" style="display: none">
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class="btn">
                                        <i class=" glyphicon glyphicon-user"></i>
                                    </button>
                                </span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class="btn">
                                        <i class=" glyphicon glyphicon-envelope"></i>
                                    </button>
                                </span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class="btn">
                                        <i class="glyphicon glyphicon-lock"></i>
                                    </button>
                                </span>
                                <input type="text" class="form-control">
                            </div>
                            <button id="btn-updateinfo" type="button">Cập nhật</button>
                        </div>
                    </div>
                    <img src="Image/5.jpg" alt="John" style="max-width: 40%; border-radius: 100%" />

                </div>
            </div>
        </div>


        <div id="body" class="row" style="margin-top: 50px; position: relative">
            <div id="tabs" class="col-md-3 col-xs-4" style="position: relative; height: 100%">

                <%-- Tap Search --%>

                <div id="tab-search" class="row" style="height: 100%; padding-bottom: 0px;">
                    <div id="head-search" class="tab-active">
                        <div><i class="glyphicon glyphicon-refresh"></i></div>
                        Tìm kiếm địa điểm

                    </div>
                    <div id="input-search">
                        <div class="input-group">
                            <input type="text" placeholder="Search" class="form-control">
                            <span class="input-group-btn">
                                <button type="button" class="btn">
                                    Filter
                                </button>
                            </span>
                        </div>
                    </div>
                    <div style="text-align: center; padding-top: 100px; display: none" id="loading">
                        <img src="images/loading.gif" />
                    </div>
                    <%-- div chua danh sach diem tim kiem, co chua button remove, Ilist  --%>
                    <div id="list-search">
                        <%-- dinh danh chung cho moi list-group-item    --%>

                        <%--<div class="list-group-item">
                            <h5 class="name"><span class="glyphicon glyphicon-map-marker"></span>Công ty Việt Bản Đồ</h5>
                            <p class="adddress">329-333, Lý Thường Kiệt, quận Tân Bình</p>
                            <div class="btn-list-search">
                                <a href="#"><span class="glyphicon glyphicon-heart-empty"></span></a>
                                <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </div>--%>
                    </div>
                    <div id="pagination" style="display: none">
                        <div style="position: relative; height: 50px" id="paginate">
                            <%--<div class="counter"></div>
                            <button type="button" class="left"><i></i><i></i></button>
                            <button type="button" class="right"><i></i><i></i></button>--%>
                        </div>

                    </div>
                </div>

                <%-- Tap tìm đường --%>

                <div id="tab-findStreet" class=" row" style="padding: 0; height: 100%; display: none;">
                    <div id="head-findStreet" class="tab-active">

                        <div>
                            <i class="glyphicon glyphicon-refresh"></i>
                        </div>
                        Tìm đường đi ngắn nhất                   

                    </div>
                    <div id="input-findStreet">
                        <%-- btn refresh  --%>

                        <%-- input diem xuat phat --%>
                        <div id="FromSearch" class="FTSearch">
                            <div class="input-group">
                                <input type="text" placeholder="Điểm xuất phát" class="Name  form-control" id="input-fromsearch">
                                <span class="input-group-btn">
                                    <button type="button" id="btn-fromsearch" class="btnSearch btn " <%--data-toggle="modal" data-target="#ListSearchStreet"--%>>
                                        <i class=" glyphicon glyphicon-search"></i>
                                    </button>


                                    <button type="button" id="F" class="btnScreenShot btn">
                                        <i class="glyphicon glyphicon-screenshot"></i>
                                    </button>
                                </span>

                            </div>
                            <%-- <button type="button" class="btn glyphicon glyphicon-screenshot"></button>--%>
                        </div>



                        <%-- input diem toi --%>
                        <div id="ToSearch" class="FTSearch">
                            <div class="input-group">
                                <input type="text" placeholder="Điểm Tới" class="Name form-control" id="input-tosearch">
                                <span class="input-group-btn">


                                    <button type="button" id="btn-tosearch" class="btnSearch btn" <%--data-toggle="modal" data-target="#ListSearchStreet"--%>>
                                        <i class=" glyphicon glyphicon-search"></i>
                                    </button>

                                    <button type="button" id="T" class="btnScreenShot btn  ">
                                        <i class="glyphicon glyphicon-screenshot"></i>
                                    </button>
                                </span>

                            </div>

                        </div>


                    </div>
                    <%--  div chua button tim va luu --%>
                    <div id="groupFindStreet">
                        <div id="saveFindStreet">
                            <div id="cuboid">
                                <!-- #1 hover button -->
                                <div>
                                    <p class="cuboid-text">Lưu</p>
                                </div>
                                <!-- #2 text input -->
                                <div>
                                    <!-- Label to trigger #submit -->
                                    <label for="save" class="submit-icon">
                                        <i class="glyphicon glyphicon-chevron-right"></i>
                                    </label>
                                    <input type="text" id="namepath" class="cuboid-text" placeholder="Tên đường" autocomplete="off" />
                                    <!-- hidden submit button -->
                                    <button type="button" id="save" />
                                </div>
                                <!-- #3 loading message -->
                                <div>
                                    <p class="cuboid-text loader">Loading...</p>
                                </div>
                                <!-- #4 success message -->
                                <div>
                                    <!-- reset/retry button -->
                                    <span class="removeStreet"><i class="glyphicon glyphicon-trash"></i></span>
                                    <p class="cuboid-text" id="nameStreet">Đã lưu !</p>
                                </div>
                            </div>
                        </div>

                        <%-- div chua huong dan duong di --%>
                        <div id="list-guideStreet" class="list-group" style="">
                            <%-- dinh danh chung cho moi list-group-item    --%>
                            <%--<a href="#" class="list-group-item">
                            <div><span class="glyphicon glyphicon-map-marker"></span>Trên <i> QL 1A phường BHH Quận Bình Tân </i></div>
                            <span class="distance-guide">2km</span>
                        </a>--%>
                        </div>

                        <div id="transporttype">
                            <div id="radios">
                                <label for="driving" class="material-icons">
                                    <input type="radio" name="mode" id="driving" value="driving" checked />
                                    <span>&#xE531;</span>
                                </label>
                                <label for="cycling" class="material-icons">
                                    <input type="radio" name="mode" id="cycling" value="cycling" />
                                    <span>&#xE52F;</span>
                                </label>
                                <label for="walking" class="material-icons">
                                    <input type="radio" name="mode" id="walking" value="walking" />
                                    <span>&#xE536;</span>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>

                <%-- Tap Ilist --%>

                <div id="tab-Ilist" class="row" style="height: 100%; display: none">
                    <div id="head-Ilist" class="col-xs-12">
                        <%-- tabs danh sach quna tam--%>
                        <div id="tab-Ilist-search" class="col-sm-6 col-xs-12 tab-active">
                            <div><i class="glyphicon glyphicon-refresh"></i></div>
                            <p>Vị trí</p>
                        </div>
                        <div id="tab-Ilist-find" class="col-sm-6 col-xs-12 tab-off">
                            <div><i class="glyphicon glyphicon-refresh"></i></div>
                            <p>Lộ trình</p>
                        </div>
                    </div>

                    <div id="list-Ilist" class="col-xs-12">
                        <%-- list cua tab tab-Ilist-search  tim diem --%>
                        <div id="list-Ilist-search">
                            <div class="filter">
                                <div class="input-group">
                                    <input type="text" placeholder="Search" class="form-control">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn">
                                            Filter                                
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="list-group" id="addRowPoint">
                            </div>
                        </div>

                        <%-- list cua tab tab-Ilist-find  tim duong--%>
                        <div id="list-Ilist-find" style="display: none">
                            <div class="filter">
                                <div class="input-group">
                                    <input type="text" placeholder="Search" class="form-control">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn">
                                            Filter
                                        </button>
                                    </span>
                                </div>
                            </div>

                            <div class="list-group" id="addRowLine">
                                <%--                                 <div class="list-group-item active" >
                                    <h5 class="name"><span class="glyphicon glyphicon-map-marker"></span>Tên lộ trình</h5>
                                    <p class="adddress"><i class="glyphicon glyphicon-flag"></i>điểm xuất phát</p>
                                    <p class="adddress"><i class="glyphicon glyphicon-send"></i>Điểm đến</p>
                                    <div class="btn-list-search">
                                        <a href="#modal-editLine" data-toggle='modal'><span class="glyphicon glyphicon-pencil"></span></a>
                                        <a href="#"><span class="glyphicon glyphicon-trash"></span></a>
                                        <a href="#"><span class="glyphicon glyphicon-share-alt"></span></a>
                                    </div>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <%-- End div tabs left --%>


            <%-- Div Content --%>

            <div id="content" class="col-md-9 col-xs-8" style="position: relative; height: 100%;">
                <div id="function" class="row" style="position: relative">
                    <div class="navbar" role="navigation">
                        <div class="container-fluid">
                            <div class="row" id="row-border">
                                <div class="toggle-tabs" id="close-tabs">

                                    <a href="#">
                                        <img src="images/toggle-tabs-icon.png" />
                                    </a>


                                </div>
                                <div class="navbar-header col-md-6  col-md-push-6 col-sm-4  col-sm-push-8 col-xs-12">
                                    <button type="button" id="btn-collapse" class="navbar-toggle" data-toggle="collapse" data-target="#collapse-function">

                                        <span class="glyphicon glyphicon-th"></span>

                                    </button>
                                    <div class="<%--col-sm-3 col-sm-push-9  col-md-6 col-md-push-6--%> function-search">
                                        <div class="input-group">
                                            <input type="text" placeholder="Search" class="form-control searchPoint" id="input-search-all">
                                            <span class="input-group-btn">
                                                <button type="button" class="btn" id="btn-search-all">
                                                    <span class="glyphicon glyphicon-search"></span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6 col-md-pull-6 col-sm-8 col-sm-pull-4  col-xs-12" id="collapse">
                                    <div class="navbar-collapse collapse row" id="collapse-function">

                                        <div class="elTab col-xs-4  function-tab" id="btn-toggle-search">Tìm kiếm </div>
                                        <div class="elTab col-xs-4 function-tab" id="btn-toggle-find">Tìm đường</div>
                                        <div class="elTab col-xs-4  function-tab" id="btn-toggle-ilist">Cá nhân</div>
                                    </div>
                                </div>
                            </div>
                            <!--/.navbar-collapse -->
                        </div>
                    </div>
                </div>


                <div id="map" class="row" style="height: 100%; z-index: 0;">
                    <div id="modalerror" style="display:none">
                        <div class="head">
                            <span class="glyphicon glyphicon-leaf"></span> Lỗi
                            <button type="button" id="close_error">
                                <i class=" glyphicon glyphicon-remove"></i>
                            </button>
                        </div>
                        <div class="content" id ="contenterror">
                           dgdg
                        </div>
                       
                    </div>
                </div>

                <div id="view-searchFind" style="display: none">
                    <div id="head-view-searchFind">
                        Danh sách tìm kiếm
                        <button type="button">
                            <i class="glyphicon glyphicon-transfer"></i>
                        </button>
                    </div>

                    <div id="list-view-searchFind" class="list-group">
                    </div>
                    <div id="pagination-find" style="">
                        <div id="paginate-find" style="position: relative; height: 50px;">
                        </div>
                    </div>
                </div>

                <%-- edit Line --%>
                <div id="editLine" class="normal">
                    <div id="head-editLine">
                        Cập nhật thông tin
                        <button type="button" class="close-editLine">
                            <i class="glyphicon glyphicon-remove"></i>
                        </button>
                    </div>

                    <div id="body-editLine">
                        <div class="form-group">
                            <label>Tên lộ trình</label>
                            <div>
                                <input type="text" class="form-control" id="name-editLine" />
                            </div>
                            <span class="icon-error glyphicon glyphicon-warning-sign"></span>
                        </div>
                        <div class="form-group  ">
                            <label>Điểm xuất phát</label>
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class="btn" id="point1-update">
                                        <i class="glyphicon glyphicon-map-marker"></i>
                                    </button>
                                </span>
                                <input type="text" class="form-control" id="point1-editLine" />
                            </div>
                            <span class="icon-error glyphicon glyphicon-warning-sign"></span>
                        </div>
                        <div class="form-group ">
                            <label>Điểm đến</label>
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button type="button" class="btn" id="point2-update">
                                        <i class="glyphicon glyphicon-map-marker"></i>
                                    </button>
                                </span>
                                <input type="text" class="form-control" id="point2-editLine" />
                            </div>
                            <span class="icon-error glyphicon glyphicon-warning-sign"></span>
                        </div>

                        <div class="form-group">
                            <label>Chú thích</label>
                            <textarea rows="4" class="form-control" id="info-editLine"></textarea>
                        </div>

                    </div>
                    <%-- Success Div --%>
                    <div class="success" id="success-editLine">
                        <div>
                            <div class="checkmark-circle">
                                <div class="background"></div>
                                <div class="checkmark draw"></div>
                            </div>
                        </div>
                        Thành công!
                    </div>
                    <div id="foot-editLine" style="">
                        <button type="button" id="save-editLine" class="btn btn-danger">Lưu thay đổi</button>
                        <button type="button" class="close-editLine">Thoát</button>
                    </div>
                </div>



                <%-- End div Content --%>
            </div>
        </div>
        <%-- -------------------------MODAL-------------------------- --%>

        <%--MODAL LIST FIND STREEET --%>
        <div id="myModal">



            <%-- Error --%>
            <div class="modal" id="">
                <div class="modal-dialog modal-md ">
                    <div class="modal-content">
                        <!--  header model -->
                        <div class="modal-header text-white">
                            <h5><i class=" glyphicon glyphicon-warning-sign "></i>Lỗi</h5>
                        </div>
                        <!-- body model -->
                        <div class="modal-body">
                            <p>Bạn chưa cài sự kiện cho button này!!!</p>
                        </div>

                        <!-- footer model -->
                        <div class="modal-footer">
                            <button type="button" class="btnCont btn" data-dismiss="modal">Tiếp tục</button>
                            <button type="button" class="Exit btnClose btn" data-dismiss="modal">Thoát</button>
                        </div>
                    </div>
                </div>
            </div>



            <%-- Edit Point --%>
            <div class="modal" id="modal-editPoint">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <!--  header model -->
                        <div class="modal-header">
                            <h4><i class=" glyphicon glyphicon-wrench"></i>Chỉnh sửa thông tin</h4>
                        </div>
                        <!-- body model -->
                        <div class="modal-body col-lg-12 col-md-12 col-sm-12">
                            <div id="form-edit-point">
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label>Tên</label>
                                    <input type="text" class="form-control" id="nameModalEditPoint" />
                                    <span class="icon-error glyphicon glyphicon-warning-sign"></span>
                                </div>
                                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                                    <label>Địa chỉ</label>
                                    <input type="text" class="form-control" id="addressModalEditPoint" />
                                    <span class="icon-error glyphicon glyphicon-warning-sign"></span>
                                </div>
                                <div class="form-group col-lg-6 col-md-6 col-sm-6">
                                    <label>Tung độ</label>
                                    <input type="text" class="form-control" id="longModalEditPoint" disabled />

                                </div>
                                <div class="form-group  col-lg-6 col-md-6 col-sm-6">
                                    <label>Hoành Độ</label>
                                    <input type="text" class="form-control" id="latModalEditPoint" disabled />
                                </div>
                                <div class="form-group  col-lg-12 col-md-12 col-sm-12">
                                    <label>Một số thông tin liên quan</label>
                                    <textarea rows="4" class="form-control" id="infoModalEditPoint"></textarea>
                                </div>
                            </div>
                            <div class="success" id="success-point" style="display: none">
                                <div>
                                    <div class="checkmark-circle">
                                        <div class="background"></div>
                                        <div class="checkmark draw"></div>
                                    </div>
                                </div>
                                Thành công!
                            </div>
                        </div>

                        <!-- footer model -->
                        <div class="modal-footer">
                            <button type="button" class="btnCont btn" id="saveModalEditPoint">Lưu thay đổi</button>
                            <button type="button" class="Exit btnClose btn" data-dismiss="modal">Thoát</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <%-- End Modal --%>

        <%-- End body --%>
    </div>
</asp:Content>
<%--<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%= Combres.WebExtensions.CombresLink("App_Map_Script")%>
</asp:Content>--%>
