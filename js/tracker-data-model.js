var Data = function(){    var self = {};    self.Init = function(){    event_helper.SubscribeOn(      Data.EVENTS.OnLoaded_PointsPeriod,      { callback : OnLoaded_PointsPeriod } );  };//Init      function OnLoaded_PointsPeriod(){        if( Data.tracks_points.length == 0 ){      return;    }//if        BreakRawPointsOnTraks();  }//OnLoaded_PointsPeriod      function BreakRawPointsOnTraks(){    var diff_time;    var point_curr;    var point_prev;        //track whick connects points with small time differece    var track = [];        point_curr = Data.tracks_points[0];    point_prev = point_curr;        point_curr.coords = GetGoogleCoords( point_curr );        track.push( point_curr );            for( var i = 1; i < Data.tracks_points.length; i++ ){            point_curr        = Data.tracks_points[i];      point_curr.coords = GetGoogleCoords( point_curr );            diff_time = GetTimeDiff( point_curr, point_prev );            point_prev = point_curr;            //if difference more than chk_diff_time_tracks      if( diff_time > Data.chk_diff_time_tracks ){                Data.tracks.push( track );        track = [];        continue;      }//if            track.push( point_curr );    }//for        Data.tracks.push( track );        event_helper.Trigger( Data.EVENTS.OnReady_Tracks );      }//BreakRawPointsOnTraks    return self;};Data.is_visible_toolbar_period = false;Data.is_enabled_auto_update    = false;Data.is_enabled_auto_center    = false;Data.user_id       = 111;Data.user_password = 111;Data.chk_diff_time_tracks = 6000000;//100minData.chk_diff_time_marker = 60000;//1minData.chk_diff_position    = 0.00001;//1 metersData.tracks_points = [];//array of raw points of all tracksData.tracks        = [];//array of tracks with raw pointsData.EVENTS = {  OnReqSucc_GetPoints_Period       : 'OnReqSucc_GetPoints_Period',  OnReqSucc_GetPoints_Period_Count : 'OnReqSucc_GetPoints_Period_Count',    OnReqSucc_GetPointLast  : 'OnReqSucc_GetPointLast',  OnReqSucc_GetPointsLast : 'OnReqSucc_GetPointsLast',    OnLoaded_PointsPeriod : 'OnLoaded_PointsPeriod',    OnReady_Tracks : 'OnReady_Tracks'};