package pl.mb

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@Secured(['ROLE_ADMIN'])
@Resource(uri = '/api/trip')
class Trip {

    String origin
    String destination

    static constraints = {
        origin nullable: false
        destination nullable: false
    }
}
