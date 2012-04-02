using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dts.Mvc.Controllers;
using Dts.Infrastructure.Logging;

namespace BackboneDemo.Controllers
{
    public class MousePositionController : BaseController
    {
        public MousePositionController(ILogger logger)
            : base(logger)
        {
        }

        public ActionResult Index()
        {            
            return View();
        }
    }
}
