using System.Collections.Generic;
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
            CreateMap<Make, KeyValuePairResources>();
            CreateMap<Model, KeyValuePairResources>();
            CreateMap<Feature, KeyValuePairResources>();
            CreateMap<Vehicle, SaveVehiclesResources>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactsResources() { Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehiclesResources>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactsResources() { Name = v.ContactName, Phone = v.ContactPhone, Email = v.ContactEmail }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResources() { Id = vf.Feature.Id, Name = vf.Feature.Name })))
                .ForMember(vr => vr.Makes, opt => opt.MapFrom(v => v.Model.Make));

            //Push data from resources to server, we need mapping API to Domain
            CreateMap<FilterResources, Filter>();
            
            CreateMap<SaveVehiclesResources, Vehicle>()
                .ForMember(vehicle => vehicle.Id, opt => opt.Ignore())
                .ForMember(vehicle => vehicle.ContactEmail, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Email))
                .ForMember(vehicle => vehicle.ContactName, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Name))
                .ForMember(vehicle => vehicle.ContactPhone, opt => opt.MapFrom(vehicleResources => vehicleResources.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                    .AfterMap((vr, v) =>
                    {
                        //Remove unselected features
                        var removeFeatures = v.Features.Where(f => vr.Features.Contains(f.FeatureId));
                        foreach (var f in removeFeatures.ToList())
                            v.Features.Remove(f);

                        //Add new Features
                        var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature() { FeatureId = id });
                        foreach (var f in addedFeatures.ToList())
                            v.Features.Add(f);
                    });
        }
    }
}