// Generated by CoffeeScript 1.11.1
(function() {
  window.parseRobot = function(xml) {
    var error, robotBaseMaterial, xmelon;
    try {
      xmelon = $.parseXML(xml);
    } catch (error1) {
      error = error1;
      console.log(error);
      return false;
    }
    window.scene = window.scene || new THREE.Scene;
    if (window.robotmaterialcollection != null) {
      window.robotmaterialcollection.reset();
    } else {
      window.robotmaterialcollection = new App.RobotMaterialCollection();
    }
    if (window.robotlinkcollection != null) {
      window.robotlinkcollection.reset();
    } else {
      window.robotlinkcollection = new App.RobotLinkCollection();
    }
    if (window.robotjointcollection != null) {
      window.robotjointcollection.reset();
    } else {
      window.robotjointcollection = new App.RobotJointCollection();
    }
    xmelon = $.parseXML(xml);
    robotBaseMaterial = new THREE.MeshPhongMaterial({
      color: 0x6E23BB,
      specular: 0x6E23BB,
      shininess: 50
    });
    window.robot = new THREE.Object3D();
    window.robot.name = "robot";
    $(xmelon).find("color").parent().each(function(index) {
      var robotcolor;
      robotcolor = new App.RobotMaterial($.xml2json(this));
      window.robotmaterialcollection.add(robotcolor);
      return true;
    });
    $(xmelon).find("link").each(function(index) {
      var robotlink, tjson;
      tjson = $.xml2json(this);
      tjson["materialcollection"] = window.robotmaterialcollection;
      robotlink = new App.RobotLink(tjson);
      window.robotlinkcollection.add(robotlink);
      window.robot.add(robotlink.get("link"));
      return true;
    });
    $(xmelon).find("joint").each(function(index) {
      var robotjoint;
      robotjoint = new App.RobotJoint($.xml2json(this));
      robotjoint.set("linkcollection", window.robotlinkcollection);
      return window.robotjointcollection.add(robotjoint);
    });
    window.scene.add(window.robot);
    renderer.render(window.scene, App.camera);
    App.trajectoryview.create_list();
    return true;
  };

}).call(this);
