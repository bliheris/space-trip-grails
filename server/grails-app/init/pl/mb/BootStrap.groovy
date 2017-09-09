package pl.mb

class BootStrap {

    def init = { servletContext ->
        log.info "Loading database..."

        def admin = new User(username: "admin", password: "admin").save()
        def driver1 = new Driver(name: "Susan", username: "susan", password: "password1").save()
        def driver2 = new Driver(name: "Pedro", username:  "pedro", password: "password2").save()

        Role adminRole = new Role(authority: "ROLE_ADMIN").save()
        Role userRole = new Role(authority: "ROLE_USER").save()

        UserRole.create(admin, adminRole, true)
        UserRole.create(admin, userRole, true)
        UserRole.create(driver1, userRole, true)
        UserRole.create(driver2, userRole, true)

        Trip t1 = new Trip(origin: "Earth", destination: "Mars").save()

        def nissan = new Make(name: "Nissan").save()
        def ford = new Make(name: "Ford").save()

        def titan = new Model(name: "Titan").save()
        def leaf = new Model(name: "Leaf").save()
        def windstar = new Model(name: "Windstar").save()

        new Vehicle(name: "Pickup", driver: driver1, make: nissan, model: titan).save()
        new Vehicle(name: "Economy", driver: driver1, make: nissan, model: leaf).save()
        new Vehicle(name: "Minivan", driver: driver2, make: ford, model: windstar).save()
    }
    def destroy = {
    }
}
