using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dts.Mvc.Controllers;
using Dts.Infrastructure.Logging;

namespace BackboneDemo.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(ILogger logger)
            : base(logger)
        {
        }

        public ActionResult Index()
        {            
            return View();
        }

        public ActionResult CameraTest()
        {
            ViewBag.ImageName = TempData["ImageName"];
            return View();
        }

        [HttpPost]
        public ActionResult CameraTest(IEnumerable<HttpPostedFileBase> pics)
        {
            var pic = pics.FirstOrDefault();
            if (pic != null)
            {
                pic.SaveAs(Server.MapPath("~/public/uploads/" + pic.FileName));
            }
            
            TempData["ImageName"] = pic.FileName;

            return RedirectToAction("CameraTest");
        }
    }
}
