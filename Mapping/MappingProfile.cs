using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Mapping Domain to API Resources for get API from server
            CreateMap<Make, MakesResources>();
            CreateMap<Model, ModelsResources>();
            CreateMap<Feature, FeatureResources>();
            CreateMap<Vehicle, VehiclesResources>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactsResources(){Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            //Push data from resources to server, we need mapping API to Domain
            CreateMap<VehiclesResources, Vehicle>()
                .ForMember(vehicle => vehicle.ContactEmail, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Email))
                .ForMember(vehicle => vehicle.ContactName, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Name))
                .ForMember(vehicle => vehicle.ContactPhone, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Phone))
                .ForMember(vehicle => vehicle.Features, opt => opt.MapFrom(vehicleResources => vehicleResources.Features.Select(id => new VehicleFeature(){FeatureId = id})));
        }
    }
}