using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dts.Infrastructure.Logging;

namespace Dts.Mvc.Controllers
{
    public abstract partial class BaseController : Controller
    {
        /// <summary>
        /// Logger that can be accessed by derived classes
        /// </summary>
        protected ILogger Logger { get; set; }

        public BaseController(ILogger logger)
        {
            Logger = logger;
        }

        /// <summary>
        /// Initialization goodness. Once it's spun up and has the request, we set the ViewBag.HasSession property
        /// so we can use that in views... better and more authoritative than Request.IsAuthenticated which has
        /// issues at times
        /// </summary>
        /// <param name="requestContext"></param>
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
    }
}