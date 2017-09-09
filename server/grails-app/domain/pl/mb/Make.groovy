package pl.mb

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import groovy.transform.CompileStatic

@CompileStatic
@Secured(['ROLE_USER'])
@Resource(uri = '/api/make')
class Make {

    String name

    static constraints = {
    }
}
