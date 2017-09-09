package pl.mb

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import groovy.transform.CompileStatic

@CompileStatic
@Secured(['ROLE_DRIVER'])
@Resource(uri = '/vehicle')
class Vehicle {

    String name
    Make make
    Model model

    static belongsTo = [driver: Driver]

    static constraints = {
    }
}
