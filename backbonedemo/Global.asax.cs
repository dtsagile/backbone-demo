using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Dts.Infrastructure.Logging;
using Autofac;
using Autofac.Integration.Mvc;
using System.Data.Entity;

namespace BackboneDemo
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private ILogger _logger;


        protected void Application_Start()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            //builder.Register(c => new DatabaseContext()).InstancePerHttpRequest();
            //builder.RegisterType<UserAccountRepository>().As<IUserAccountRepository>().InstancePerHttpRequest();
            //builder.RegisterType<RoleRepository>().As<IRoleRepository>().InstancePerHttpRequest();

            builder.RegisterType<NLogLogger>().As<ILogger>().SingleInstance();

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            _logger = DependencyResolver.Current.GetService<ILogger>();            

            AreaRegistration.RegisterAllAreas();
            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            _logger.Info("Application is starting");
        }

        protected void Application_End()
        {
            //can't call this here because when we protect it, it recylces the app pool, calling Application_End, so it would immediately become unprotected and we'd be in a loop
            //ConfigurationProtector.Unprotect();

            _logger.Info("Application is shutting down");
        }

        protected void Application_Error()
        {
            Exception lastException = Server.GetLastError();
            _logger.Fatal(lastException);
        }

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );            
        }

    }
}